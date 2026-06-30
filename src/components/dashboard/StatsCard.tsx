interface Props {
  label: string
  value: number | string
}

export function StatsCard({
  label,
  value,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-zinc-900
      bg-zinc-950
      p-8
    "
    >
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <h2
        className="
        mt-3
        text-5xl
        font-bold
      "
      >
        {value}
      </h2>
    </div>
  )
}