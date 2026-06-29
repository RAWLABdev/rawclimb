import Link from "next/link";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type Area = {
  id: number;
  name: string;
  description: string | null;
  country_name: string | null;
};

type Zone = {
  id: number;
  public_id: string;
  name: string;
  image_path: string | null;
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getAreaWithZones(id: string) {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const area = await db
    .prepare(
      `
      SELECT
        climbing_areas.id,
        climbing_areas.name,
        climbing_areas.description,
        countries.name as country_name
      FROM climbing_areas
      LEFT JOIN countries ON countries.id = climbing_areas.country_id
      WHERE climbing_areas.id = ?
      `,
    )
    .bind(id)
    .first<Area>();

  if (!area) return null;

  const { results: zones } = await db
    .prepare(
      `
      SELECT
        id,
        public_id,
        name,
        image_path
      FROM climbing_zones
      WHERE area_id = ?
      ORDER BY name ASC
      `,
    )
    .bind(id)
    .all<Zone>();

  return {
    area,
    zones,
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { id } = await params;

  const data = await getAreaWithZones(id);

  if (!data) {
    notFound();
  }

  const { area, zones } = data;

  return (
    <AppShell>
      <Link
        href="/areas"
        className="mb-8 inline-block text-sm text-zinc-500 transition hover:text-white"
      >
        ← Back to areas
      </Link>

      <div className="mb-12">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-zinc-600">
          {area.country_name ?? "Unknown"}
        </p>

        <h1 className="text-5xl font-bold">{area.name}</h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          {area.description ?? "No description yet."}
        </p>
      </div>

      <section>
        <h2 className="mb-6 text-3xl font-bold">Zones</h2>

        {zones.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 p-8 text-zinc-400">
            No zones added yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {zones.map((zone) => (
              <Link
                key={zone.public_id}
                href={`/zones/${zone.id}`}
                className="block rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600"
              >
                <h3 className="text-2xl font-bold">{zone.name}</h3>

                <p className="mt-3 text-sm text-zinc-500">
                  View routes in this zone →
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
