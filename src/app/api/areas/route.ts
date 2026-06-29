import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const { env } = await getCloudflareContext();

  const { results } = await env.DB.prepare(`
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
  `).all();

  return Response.json(results);
}
