// src/app/areas/page.tsx

import { AppShell } from "@/components/layout/AppShell"

import { AreaCard } from "@/components/areas/AreaCard"

import { areas } from "@/lib/mock/areas"

export default function AreasPage() {
  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Areas
        </h1>

        <p className="mt-4 text-zinc-400">
          Discover climbing areas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {areas.map((area) => (
          <AreaCard
            key={area.id}
            area={area}
          />
        ))}
      </div>
    </AppShell>
  )
}