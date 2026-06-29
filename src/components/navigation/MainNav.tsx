import Link from "next/link";

export const navigation = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Areas",
    href: "/areas",
  },
  {
    title: "Routes",
    href: "/routes",
  },
  {
    title: "Ascents",
    href: "/ascents",
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