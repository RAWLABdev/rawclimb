import Link from "next/link";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";
import { AddAscentForm } from "@/components/ascents/AddAscentForm";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type RouteData = {
  id: number;
  name: string;
  grade: string;
  type: string;
  zone_id: number;
  zone_name: string;
};

type Ascent = {
  id: number;
  public_id: string;
  type: string;
  date: string;
  rating: number | null;
  grade: string;
  notes: string | null;
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getRouteWithAscents(id: string) {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const route = await db
    .prepare(`
      SELECT
        climbing_routes.id,
        climbing_routes.name,
        climbing_routes.grade,
        climbing_routes.type,
        climbing_routes.zone_id,
        climbing_zones.name as zone_name
      FROM climbing_routes
      JOIN climbing_zones ON climbing_zones.id = climbing_routes.zone_id
      WHERE climbing_routes.id = ?
    `)
    .bind(id)
    .first<RouteData>();

  if (!route) return null;

  const { results: ascents } = await db
    .prepare(`
      SELECT
        id,
        public_id,
        type,
        date,
        rating,
        grade,
        notes
      FROM climbing_ascents
      WHERE route_id = ?
      ORDER BY date DESC
    `)
    .bind(id)
    .all<Ascent>();

  return { route, ascents };
}

export default async function RouteDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getRouteWithAscents(id);

  if (!data) notFound();

  const { route, ascents } = data;

  return (
    <AppShell>
      <Link
        href={`/zones/${route.zone_id}`}
        className="mb-8 inline-block text-sm text-zinc-500 transition hover:text-white"
      >
        ← Back to {route.zone_name}
      </Link>

      <div className="mb-12">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-zinc-600">
          {route.type}
        </p>

        <h1 className="text-6xl font-bold">{route.name}</h1>

        <div className="mt-6 inline-flex rounded-full border border-zinc-700 px-6 py-3 text-xl font-bold">
          {route.grade}
        </div>
      </div>

      <section className="rounded-3xl border border-zinc-800 p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Ascents</h2>

          <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
            {ascents.length} records
          </span>
        </div>

        {ascents.length === 0 ? (
          <p className="text-zinc-400">
            No ascents registered yet.
          </p>
        ) : (
          <div className="space-y-4">
            {ascents.map((ascent) => (
              <article
                key={ascent.public_id}
                className="rounded-2xl border border-zinc-800 p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="font-bold capitalize">
                    {ascent.type}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {ascent.date}
                  </p>
                </div>

                <p className="text-sm text-zinc-400">
                  Grade: {ascent.grade}
                  {ascent.rating ? ` · Rating: ${ascent.rating}/5` : ""}
                </p>

                {ascent.notes ? (
                  <p className="mt-3 text-zinc-400">
                    {ascent.notes}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
      <AddAscentForm routeId={route.id} grade={route.grade} />
    </AppShell>
    
  );
}
