import { ReactNode } from "react";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export function AppShell({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}