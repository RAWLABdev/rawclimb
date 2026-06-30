import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";
import { CreateSessionForm } from "@/components/sessions/CreateSessionForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type Area = {
  id: number;
  name: string;
};

type Session = {
  id: number;
  session_date: string;
  duration_minutes: number | null;
  notes: string | null;
  area_name: string;
};

async function getAreas() {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const { results } = await db
    .prepare(`
      SELECT
        id,
        name
      FROM climbing_areas
      ORDER BY name
    `)
    .all<Area>();

  return results;
}

async function getSessions() {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const { results } = await db
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
      ORDER BY climbing_sessions.session_date DESC
    `)
    .all<Session>();

  return results;
}

export default async function SessionsPage() {
  const [sessions, areas] = await Promise.all([
    getSessions(),
    getAreas(),
  ]);

  return (
    <AppShell>
      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          Sessions
        </h1>

        <p className="mt-4 text-zinc-400">
          Your climbing diary.
        </p>
      </div>

      <div className="mb-10">
        <CreateSessionForm areas={areas} />
      </div>

      <div className="space-y-6">
        {sessions.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 p-8 text-zinc-400">
            No sessions yet. Create your first climbing session.
          </div>
        ) : (
          sessions.map((session) => (
            <Link
  href={`/sessions/${session.id}`}
  key={session.id}
  className="block rounded-3xl border border-zinc-800 p-8 transition hover:border-zinc-600"
>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {session.area_name}
                  </h2>

                  <p className="mt-2 text-zinc-500">
                    {session.session_date}
                  </p>
                </div>

                <div className="rounded-full border border-zinc-700 px-4 py-2">
                  {session.duration_minutes ?? 0} min
                </div>
              </div>

              {session.notes && (
                <p className="mt-6 text-zinc-400">
                  {session.notes}
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </AppShell>
  );
}