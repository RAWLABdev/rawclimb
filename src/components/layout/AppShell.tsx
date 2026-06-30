import { ReactNode } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-black text-white lg:flex">
      <Sidebar />

      <section className="w-full flex-1">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12 lg:py-12">
          {children}
        </div>
      </section>
    </main>
  );
}