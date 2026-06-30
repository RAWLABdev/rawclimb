interface Props {
  title: string
  description?: string
  children: React.ReactNode
}

export function RawSection({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="mb-16">

      <div className="mb-8">

        <p
          className="
          mb-3
          text-xs
          uppercase
          tracking-[0.3em]
          text-zinc-600
        "
        >
          RAWCLIMB_
        </p>

        <h1 className="text-5xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-zinc-500">
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  )
}