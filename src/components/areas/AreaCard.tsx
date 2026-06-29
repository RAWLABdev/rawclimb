import Link from "next/link"

import { Area } from "@/types/area"

interface Props {
  area: Area
}

export function AreaCard({
  area,
}: Props) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="rounded-3xl border border-zinc-800 p-6 transition hover:border-zinc-600"
    >
      <h2 className="mb-2 text-2xl font-bold">
        {area.name}
      </h2>

      <p className="mb-4 text-zinc-400">
        {area.description}
      </p>

      <span className="text-xs uppercase tracking-widest text-zinc-600">
        {area.country}
      </span>
    </Link>
  )
}