import { AppShell } from "@/components/layout/AppShell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Profile</h1>

        <p className="mt-4 text-zinc-400">
          Your RAWCLIMB public profile and climbing archive.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 p-8">
        <h2 className="text-2xl font-bold">Raúl Ruiz</h2>
        <p className="mt-3 text-zinc-400">
          Climber, frontend developer and RAWLAB_ builder.
        </p>
      </div>
    </AppShell>
  );
}
