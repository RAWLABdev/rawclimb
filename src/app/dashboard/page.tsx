import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";
import { RawCard } from "@/components/raw/RawCard";

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

  const stats =
    (await db
      .prepare(`
        SELECT
          (SELECT COUNT(*) FROM climbing_areas) as total_areas,
          (SELECT COUNT(*) FROM climbing_zones) as total_zones,
          (SELECT COUNT(*) FROM climbing_routes) as total_routes,
          (SELECT COUNT(*) FROM climbing_ascents) as total_ascents
      `)
      .first<DashboardStats>()) ?? {
      total_areas: 0,
      total_zones: 0,
      total_routes: 0,
      total_ascents: 0,
    };

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
      JOIN climbing_routes
        ON climbing_routes.id = climbing_ascents.route_id
      JOIN climbing_zones
        ON climbing_zones.id = climbing_routes.zone_id
      ORDER BY climbing_ascents.date DESC,
               climbing_ascents.id DESC
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
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
          RAWCLIMB_
        </p>

        <h1 className="mt-4 text-6xl font-black tracking-tight">
          Dashboard
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-500">
          Your personal climbing archive.
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-2">
        <Link href="/areas">
          <RawCard title="Areas" subtitle="Explore climbing areas">
            <p className="text-6xl font-black">
              {stats.total_areas}
            </p>
          </RawCard>
        </Link>

        <Link href="/ascents">
          <RawCard title="Ascents" subtitle="Your climbing history">
            <p className="text-6xl font-black">
              {stats.total_ascents}
            </p>
          </RawCard>
        </Link>

        <Link href="/routes">
          <RawCard title="Routes" subtitle="Available climbs">
            <p className="text-6xl font-black">
              {stats.total_routes}
            </p>
          </RawCard>
        </Link>

        <RawCard title="Zones" subtitle="Climbing sectors">
          <p className="text-6xl font-black">
            {stats.total_zones}
          </p>
        </RawCard>
      </div>

      <RawCard
        title="Recent Ascents"
        subtitle="Your latest climbing activity"
      >
        {recentAscents.length === 0 ? (
          <p className="text-zinc-500">
            No ascents recorded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {recentAscents.map((ascent) => (
              <div
                key={ascent.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-900 p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {ascent.route_name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {ascent.zone_name} · {ascent.type}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {ascent.grade}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {ascent.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </RawCard>
    </AppShell>
  );
}