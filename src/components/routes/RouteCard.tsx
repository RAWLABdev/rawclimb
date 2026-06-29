import Link from "next/link";
import { ClimbingRoute } from "@/types/route";

interface Props {
  route: ClimbingRoute;
}

export function RouteCard({ route }: Props) {
  return (
    <Link
      href={`/routes/${route.id}`}
      className="rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {route.name}
        </h2>

        <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
          {route.grade}
        </span>
      </div>

      <p className="text-zinc-400">
        {route.description}
      </p>
    </Link>
  );
}