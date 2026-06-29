import { getCloudflareContext } from "@opennextjs/cloudflare";

type Env = {
  DB: D1Database;
};

type CreateAscentBody = {
  type: string;
  date: string;
  rating: string | number;
  grade: string;
  notes?: string;
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: Request, { params }: Props) {
  const { id } = await params;
  const body = (await request.json()) as CreateAscentBody;

  const { env } = await getCloudflareContext();
  const db = (env as unknown as Env).DB;

  const publicId = `ascent-${crypto.randomUUID()}`;

  await db
    .prepare(`
      INSERT INTO climbing_ascents (
        public_id,
        route_id,
        user_id,
        type,
        date,
        rating,
        grade,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      publicId,
      Number(id),
      "raw",
      body.type,
      body.date,
      Number(body.rating),
      body.grade,
      body.notes?.trim() || null,
    )
    .run();

  return Response.json({
    ok: true,
    public_id: publicId,
  });
}
