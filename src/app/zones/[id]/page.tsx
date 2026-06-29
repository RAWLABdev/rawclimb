import Link from "next/link";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type Zone = {
  id: number;
  name: string;
  area_id: number;
  area_name: string;
};

type Route = {
  id: number;
  public_id: string;
  name: string;
  type: string;
  grade: string;
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getZoneWithRoutes(id: string) {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const zone = await db
    .prepare(`
      SELECT
        climbing_zones.id,
        climbing_zones.name,
        climbing_zones.area_id,
        climbing_areas.name as area_name
      FROM climbing_zones
      JOIN climbing_areas ON climbing_areas.id = climbing_zones.area_id
      WHERE climbing_zones.id = ?
    `)
    .bind(id)
    .first<Zone>();

  if (!zone) return null;

  const { results: routes } = await db
    .prepare(`
      SELECT
        id,
        public_id,
        name,
        type,
        grade
      FROM climbing_routes
      WHERE zone_id = ?
      ORDER BY name ASC
    `)
    .bind(id)
    .all<Route>();

  return { zone, routes };
}

export default async function ZoneDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getZoneWithRoutes(id);

  if (!data) notFound();

  const { zone, routes } = data;

  return (
    <AppShell>
      <Link
        href={`/areas/${zone.area_id}`}
        className="mb-8 inline-block text-sm text-zinc-500 transition hover:text-white"
      >
        ← Back to {zone.area_name}
      </Link>

      <div className="mb-12">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-zinc-600">
          Zone
        </p>

        <h1 className="text-5xl font-bold">{zone.name}</h1>

        <p className="mt-4 text-zinc-400">
          Routes available in this zone.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.public_id}
            href={`/routes/${route.id}`}
            className="block rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{route.name}</h2>

              <span className="rounded-full bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
                {route.grade}
              </span>
            </div>

            <p className="text-sm uppercase tracking-widest text-zinc-600">
              {route.type}
            </p>

            <p className="mt-4 text-sm text-zinc-500">
              View route →
            </p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
