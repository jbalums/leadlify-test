import type { Metadata } from "next";
import "./reference.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invincible Marketer",
  description:
    "How 3,500+ complete beginners are earning commissions with short videos and a funnel they didn't have to build.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="elFont_lato">
      <body>{children}</body>
    </html>
  );
}
