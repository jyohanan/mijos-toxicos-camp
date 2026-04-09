import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mijos Tóxicos Dual Sports Camp",
  description: "A premium, culture-driven youth sports experience. Football + Soccer. June 13, 2026. Ages 13–18.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
