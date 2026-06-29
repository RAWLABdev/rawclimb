import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAWCLIMB_",
  description: "Personal climbing route, ascent and progress tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
