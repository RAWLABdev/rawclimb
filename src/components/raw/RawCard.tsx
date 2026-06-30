import { ReactNode } from "react";

interface RawCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function RawCard({
  title,
  subtitle,
  children,
}: RawCardProps) {
  return (
    <section
      className="
      rounded-3xl
      border
      border-zinc-900
      bg-zinc-950/60
      p-8
      backdrop-blur
    "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-zinc-500">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}