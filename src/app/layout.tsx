import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Productize Yourself | Build & Sell with Ross Power",
  description:
    "Turn who you are into what you do, create, and sell. A 16-week AI-native program to build your productized consulting business with 30+ operational assets.",
  metadataBase: new URL("https://apply.productizeyourself.ai"),
  openGraph: {
    title: "Productize Yourself | Build & Sell with Ross Power",
    description:
      "Turn who you are into what you do, create, and sell. A 16-week AI-native program to build your productized consulting business with 30+ operational assets.",
    type: "website",
    url: "https://apply.productizeyourself.ai",
    images: [
      {
        url: "https://apply.productizeyourself.ai/images/assets/social-preview-image.png",
        width: 1200,
        height: 630,
        alt: "Productize Yourself — 16-week AI-native program by Ross Power",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productize Yourself | Build & Sell with Ross Power",
    description:
      "Turn who you are into what you do, create, and sell. A 16-week AI-native program to build your productized consulting business with 30+ operational assets.",
    images: ["https://apply.productizeyourself.ai/images/assets/social-preview-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="https://links.productizeyourself.ai/js/form_embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
