import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type DashboardStats = {
  total_areas: number;
  total_zones: number;
  total_routes: number;
  total_ascents: number;
};

type RecentAscent = {
  id: number;
  type: string;
  date: string;
  grade: string;
  route_name: string;
  zone_name: string;
};

async function getDashboardData() {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const stats = await db
    .prepare(`
      SELECT
        (SELECT COUNT(*) FROM climbing_areas) as total_areas,
        (SELECT COUNT(*) FROM climbing_zones) as total_zones,
        (SELECT COUNT(*) FROM climbing_routes) as total_routes,
        (SELECT COUNT(*) FROM climbing_ascents) as total_ascents
    `)
    .first<DashboardStats>();

  const { results: recentAscents } = await db
    .prepare(`
      SELECT
        climbing_ascents.id,
        climbing_ascents.type,
        climbing_ascents.date,
        climbing_ascents.grade,
        climbing_routes.name as route_name,
        climbing_zones.name as zone_name
      FROM climbing_ascents
      JOIN climbing_routes ON climbing_routes.id = climbing_ascents.route_id
      JOIN climbing_zones ON climbing_zones.id = climbing_routes.zone_id
      ORDER BY climbing_ascents.date DESC, climbing_ascents.id DESC
      LIMIT 5
    `)
    .all<RecentAscent>();

  return {
    stats,
    recentAscents,
  };
}

export default async function DashboardPage() {
  const { stats, recentAscents } = await getDashboardData();

  return (
    <AppShell>
      <div className="mb-10">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-zinc-600">
          RAWCLIMB_
        </p>

        <h1 className="text-5xl font-bold">Dashboard</h1>

        <p className="mt-4 text-zinc-400">
          Your climbing archive, powered by Cloudflare D1.
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-4">
        <Link href="/areas" className="rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600">
          <p className="text-sm text-zinc-500">Areas</p>
          <h2 className="mt-2 text-4xl font-bold">{stats?.total_areas ?? 0}</h2>
        </Link>

        <div className="rounded-3xl border border-zinc-800 p-6">
          <p className="text-sm text-zinc-500">Zones</p>
          <h2 className="mt-2 text-4xl font-bold">{stats?.total_zones ?? 0}</h2>
        </div>

        <Link href="/routes" className="rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600">
          <p className="text-sm text-zinc-500">Routes</p>
          <h2 className="mt-2 text-4xl font-bold">{stats?.total_routes ?? 0}</h2>
        </Link>

        <Link href="/ascents" className="rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600">
          <p className="text-sm text-zinc-500">Ascents</p>
          <h2 className="mt-2 text-4xl font-bold">{stats?.total_ascents ?? 0}</h2>
        </Link>
      </div>

      <section className="rounded-3xl border border-zinc-800 p-8">
        <h2 className="mb-6 text-2xl font-bold">Recent ascents</h2>

        {recentAscents.length === 0 ? (
          <p className="text-zinc-400">No ascents yet.</p>
        ) : (
          <div className="space-y-4">
            {recentAscents.map((ascent) => (
              <article
                key={ascent.id}
                className="rounded-2xl border border-zinc-800 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold">{ascent.route_name}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {ascent.zone_name} · {ascent.type}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">{ascent.grade}</p>
                    <p className="mt-1 text-sm text-zinc-500">{ascent.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
