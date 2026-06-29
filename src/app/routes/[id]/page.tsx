import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";

import { routes } from "@/lib/mock/routes";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RouteDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const route = routes.find(
    (r) => r.id === id,
  );

  if (!route) {
    notFound();
  }

  return (
    <AppShell>
      <h1 className="mb-4 text-5xl font-bold">
        {route.name}
      </h1>

      <div className="mb-8">
        <span className="rounded-full bg-zinc-800 px-4 py-2">
          {route.grade}
        </span>
      </div>

      <p className="text-zinc-400">
        {route.description}
      </p>
    </AppShell>
  );
}