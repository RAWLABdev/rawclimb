import Link from "next/link";
import { MainNav } from "../navigation/MainNav";

export function Header() {
  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-bold tracking-widest"
        >
          RAWCLIMB_
        </Link>

        <MainNav />
      </div>
    </header>
  );
}