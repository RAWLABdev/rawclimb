"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "EXPLORE",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Areas", href: "/areas" },
      { label: "Routes", href: "/routes" },
    ],
  },

  {
    title: "ACTIVITY",
    items: [
      { label: "Sessions", href: "/sessions" },
      { label: "Ascents", href: "/ascents" },
    ],
  },

  {
    title: "PERSONAL",
    items: [
      { label: "Profile", href: "/profile" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
      hidden
      w-72
      border-r
      border-zinc-900
      p-8
      lg:block
    "
    >
      <div className="mb-12">
        <h1 className="text-3xl font-black tracking-tight">
          RAWCLIMB_
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Climb · Track · Explore
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <p
              className="
              mb-4
              text-xs
              uppercase
              tracking-[0.3em]
              text-zinc-600
            "
            >
              {section.title}
            </p>

            <div className="space-y-2">
              {section.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      block rounded-xl px-4 py-3 transition
                      ${
                        active
                          ? "bg-white text-black"
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}