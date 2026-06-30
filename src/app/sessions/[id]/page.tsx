import Link from "next/link";
import { notFound } from "next/navigation";

import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type Session = {
  id: number;
  session_date: string;
  duration_minutes: number | null;
  notes: string | null;
  area_name: string;
};

type SessionRoute = {
  id: number;
  attempts: number;
  status: string;
  route_name: string;
  grade: string;
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getSession(id: string) {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const session = await db
    .prepare(`
      SELECT
        climbing_sessions.id,
        climbing_sessions.session_date,
        climbing_sessions.duration_minutes,
        climbing_sessions.notes,
        climbing_areas.name as area_name
      FROM climbing_sessions
      JOIN climbing_areas
      ON climbing_areas.id = climbing_sessions.area_id
      WHERE climbing_sessions.id = ?
    `)
    .bind(id)
    .first<Session>();

  if (!session) {
    return null;
  }

  const { results: routes } = await db
    .prepare(`
      SELECT
        session_routes.id,
        session_routes.attempts,
        session_routes.status,
        climbing_routes.name as route_name,
        climbing_routes.grade
      FROM session_routes
      JOIN climbing_routes
      ON climbing_routes.id = session_routes.route_id
      WHERE session_routes.session_id = ?
    `)
    .bind(id)
    .all<SessionRoute>();

  return {
    session,
    routes,
  };
}

export default async function SessionDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const data = await getSession(id);

  if (!data) {
    notFound();
  }

  const { session, routes } = data;

  return (
    <AppShell>
      <Link
        href="/sessions"
        className="mb-8 inline-block text-zinc-500 hover:text-white"
      >
        ← Back to sessions
      </Link>

      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          {session.area_name}
        </h1>

        <p className="mt-3 text-zinc-500">
          {session.session_date}
        </p>

        <div className="mt-6 inline-flex rounded-full border border-zinc-700 px-6 py-3">
          {session.duration_minutes} min
        </div>
      </div>

      <div className="mb-10 rounded-3xl border border-zinc-800 p-8">
        <h2 className="mb-4 text-2xl font-bold">
          Notes
        </h2>

        <p className="text-zinc-400">
          {session.notes}
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Routes
        </h2>

        <div className="space-y-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="rounded-2xl border border-zinc-800 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">
                    {route.route_name}
                  </h3>

                  <p className="mt-2 text-zinc-500">
                    {route.status}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {route.grade}
                  </p>

                  <p className="mt-2 text-zinc-500">
                    {route.attempts} attempts
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}