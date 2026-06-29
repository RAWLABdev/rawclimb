import Link from "next/link";

export function Hero() {
  return (
    <section className="py-32 text-center">
      <p className="mb-4 text-xs tracking-[0.4em] text-zinc-500">
        RAWLAB_
      </p>

      <h1 className="mb-6 text-6xl font-bold">
        RAWCLIMB_
      </h1>

      <p className="mx-auto mb-10 max-w-2xl text-zinc-400">
        Track your climbing sessions, discover areas,
        log ascents and build your personal climbing archive.
      </p>

      <Link
        href="/dashboard"
        className="rounded-xl border border-zinc-700 px-8 py-4 transition hover:bg-zinc-900"
      >
        Get Started
      </Link>
    </section>
  );
}