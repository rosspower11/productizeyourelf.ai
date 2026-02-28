import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productize Yourself | Ross Power",
  description:
    "Turn what you already know into a digital product that earns while you sleep. The complete system for building, launching, and scaling your knowledge business.",
  openGraph: {
    title: "Productize Yourself | Ross Power",
    description:
      "Turn what you already know into a digital product that earns while you sleep.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
