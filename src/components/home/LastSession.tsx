interface Props {
  area: string
  duration: number
  grade: string
}

export function LastSession({
  area,
  duration,
  grade,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-orange-500/20
      bg-orange-500/5
      p-8
    "
    >
      <p
        className="
        mb-3
        text-xs
        uppercase
        tracking-[0.3em]
        text-orange-400
      "
      >
        LAST SESSION
      </p>

      <h2 className="text-4xl font-bold">
        {area}
      </h2>

      <div className="mt-6 flex gap-6">

        <div>
          <p className="text-zinc-500">
            Duration
          </p>

          <p className="text-xl font-bold">
            {duration} min
          </p>
        </div>

        <div>
          <p className="text-zinc-500">
            Best
          </p>

          <p className="text-xl font-bold">
            {grade}
          </p>
        </div>

      </div>
    </div>
  )
}