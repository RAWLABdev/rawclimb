import { AppShell } from "@/components/layout/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <h1 className="mb-10 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 p-6">
          Best Grade
          <h2 className="mt-2 text-4xl">V5</h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-6">
          Ascents
          <h2 className="mt-2 text-4xl">148</h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-6">
          Projects
          <h2 className="mt-2 text-4xl">12</h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-6">
          Sessions
          <h2 className="mt-2 text-4xl">34</h2>
        </div>
      </div>
    </AppShell>
  );
}