"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  routeId: number;
  grade: string;
};

export function AddAscentForm({ routeId, grade }: Props) {
  const router = useRouter();

  const [type, setType] = useState("project");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [rating, setRating] = useState("4");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    await fetch(`/api/routes/${routeId}/ascents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        date,
        rating,
        grade,
        notes,
      }),
    });

    setNotes("");
    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-3xl border border-zinc-800 p-6"
    >
      <h3 className="mb-6 text-xl font-bold">
        Add ascent
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-400">
          Type
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white"
          >
            <option value="project">Project</option>
            <option value="flash">Flash</option>
            <option value="onsight">Onsight</option>
            <option value="redpoint">Redpoint</option>
            <option value="repeat">Repeat</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-zinc-400">
          Date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-zinc-400">
          Rating
          <select
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white"
          >
            <option value="1">1/5</option>
            <option value="2">2/5</option>
            <option value="3">3/5</option>
            <option value="4">4/5</option>
            <option value="5">5/5</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-zinc-400">
          Grade
          <input
            value={grade}
            readOnly
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-400"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm text-zinc-400">
        Notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="How did it feel?"
          className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white"
        />
      </label>

      <button
        disabled={isSubmitting}
        className="mt-6 rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save ascent"}
      </button>
    </form>
  );
}
