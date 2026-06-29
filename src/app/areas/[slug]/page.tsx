import { notFound } from "next/navigation"

import { AppShell } from "@/components/layout/AppShell"

import { areas } from "@/lib/mock/areas"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function AreaDetailPage({
  params,
}: Props) {
  const { slug } = await params

  const area = areas.find(
    (a) => a.slug === slug,
  )

  if (!area) {
    notFound()
  }

  return (
    <AppShell>
      <h1 className="mb-6 text-5xl font-bold">
        {area.name}
      </h1>

      <p className="max-w-2xl text-zinc-400">
        {area.description}
      </p>
    </AppShell>
  )
}