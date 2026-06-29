import Link from "next/link";

export const navigation = [
  {
    title: "Explore",
    href: "/areas",
  },

  {
    title: "Routes",
    href: "/routes",
  },

  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export function MainNav() {
  return (
    <nav className="flex gap-6">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm text-zinc-300 transition hover:text-white"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}