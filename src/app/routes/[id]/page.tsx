import Link from "next/link";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { AppShell } from "@/components/layout/AppShell";

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

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getRoute(id: string) {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  return db
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
}

export default async function RouteDetailPage({ params }: Props) {
  const { id } = await params;
  const route = await getRoute(id);

  if (!route) notFound();

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
        <h2 className="text-2xl font-bold">Ascents</h2>

        <p className="mt-4 text-zinc-400">
          Next step: register sends, projects and attempts for this route.
        </p>
      </section>
    </AppShell>
  );
}
