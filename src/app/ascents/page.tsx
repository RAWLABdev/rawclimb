import { AppShell } from "@/components/layout/AppShell";

export default function AscentsPage() {
  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Ascents
        </h1>

        <p className="mt-4 text-zinc-400">
          Track your climbing sends, projects and sessions.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 p-8">
        <p className="text-zinc-400">
          Ascents module coming from the original ClimbApp migration.
        </p>
      </div>
    </AppShell>
  );
}
