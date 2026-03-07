import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productize Yourself | Ross Power",
  description:
    "Turn who you are into what you do, create, and sell. 16 weeks. AI-native. 30+ operational assets built with you.",
  metadataBase: new URL("https://productizeyourself.ai"),
  openGraph: {
    title: "Productize Yourself | Ross Power",
    description:
      "Build your productized consulting business. 16 weeks. AI-native. 30+ operational assets.",
    type: "website",
    url: "https://productizeyourself.ai",
    images: [
      {
        url: "/images/assets/social preview image.png",
        width: 1200,
        height: 630,
        alt: "Productize Yourself | Ross Power",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productize Yourself | Ross Power",
    description:
      "Build your productized consulting business. 16 weeks. AI-native. 30+ operational assets.",
    images: ["/images/assets/social preview image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://links.productizeyourself.ai/js/form_embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
