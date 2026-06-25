import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import AccessGate from "./components/AccessGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Mijos Tóxicos Football × Soccer Camp",
  description: "A premium, culture-driven youth sports experience. Football + Soccer. July 11, 2026. Ages 13–18.",
  openGraph: {
    title: "Mijos Tóxicos Football × Soccer Camp",
    description: "Football. Soccer. Culture. Community. One day. 1,000 athletes. July 11, 2026.",
    images: [{ url: "/images/combined/thumbnail.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mijos Tóxicos Football × Soccer Camp",
    description: "Football. Soccer. Culture. Community. One day. 1,000 athletes. July 11, 2026.",
    images: ["/images/combined/thumbnail.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <AccessGate>{children}</AccessGate>
      </body>
    </html>
  );
}
