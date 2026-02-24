import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guest 360 — Insight Discovery",
  description: "Discover guest insights through interactive exploration",
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
