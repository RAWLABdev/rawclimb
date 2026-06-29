import { AppShell } from "@/components/layout/AppShell";

export default function RoutesPage() {
  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Routes</h1>

        <p className="mt-4 text-zinc-400">
          Explore climbing routes from RAWCLIMB.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 p-8">
        <p className="text-zinc-400">
          Routes module connected soon to Cloudflare D1.
        </p>
      </div>
    </AppShell>
  );
}
