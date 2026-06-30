"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Area = {
  id: number;
  name: string;
};

type Props = {
  areas: Area[];
};

export function CreateSessionForm({ areas }: Props) {
  const router = useRouter();

  const [areaId, setAreaId] = useState(areas[0]?.id ?? 1);
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const [duration, setDuration] = useState(120);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        areaId,
        date,
        duration,
        notes,
      }),
    });

    setLoading(false);
    setNotes("");

    router.refresh();
  }

  return (
    <div className="rounded-3xl border border-zinc-800 p-8">
      <h2 className="mb-6 text-2xl font-bold">
        New Session
      </h2>

      <div className="space-y-4">
        <select
          value={areaId}
          onChange={(e) => setAreaId(Number(e.target.value))}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
        >
          {areas.map((area) => (
            <option
              key={area.id}
              value={area.id}
            >
              {area.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
        />

        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Duration (minutes)"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
        />

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How was your session?"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-300 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Session"}
        </button>
      </div>
    </div>
  );
}