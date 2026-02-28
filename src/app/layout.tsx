import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productize Yourself | Ross Power",
  description:
    "Turn who you are into what you do, create, and sell. 16 weeks. AI-native. 30+ operational assets built with you.",
  openGraph: {
    title: "Productize Yourself | Ross Power",
    description:
      "Build your productized consulting business. 16 weeks. AI-native. 30+ operational assets.",
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
