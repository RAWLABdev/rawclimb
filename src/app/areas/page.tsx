import { getCloudflareContext } from "@opennextjs/cloudflare";
import { AppShell } from "@/components/layout/AppShell";

export const dynamic = "force-dynamic";

type Env = {
  DB: D1Database;
};

type Area = {
  id: number;
  public_id: string;
  name: string;
  description: string | null;
  image_path: string | null;
  latitude: number | null;
  longitude: number | null;
  country_name: string | null;
};

async function getAreas() {
  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const { results } = await db.prepare(`
    SELECT
      climbing_areas.id,
      climbing_areas.public_id,
      climbing_areas.name,
      climbing_areas.description,
      climbing_areas.image_path,
      climbing_areas.latitude,
      climbing_areas.longitude,
      countries.name as country_name
    FROM climbing_areas
    LEFT JOIN countries ON countries.id = climbing_areas.country_id
    ORDER BY climbing_areas.name ASC
  `).all<Area>();

  return results;
}

export default async function AreasPage() {
  const areas = await getAreas();

  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Areas</h1>

        <p className="mt-4 text-zinc-400">
          Explore climbing areas from RAWCLIMB.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {areas.map((area) => (
          <article
            key={area.public_id}
            className="rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600"
          >
            <h2 className="mb-2 text-2xl font-bold">{area.name}</h2>

            <p className="mb-4 text-zinc-400">
              {area.description ?? "No description yet."}
            </p>

            <span className="text-xs uppercase tracking-widest text-zinc-600">
              {area.country_name ?? "Unknown"}
            </span>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
