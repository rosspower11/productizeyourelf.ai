import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import "./globals.css";

const OG_IMAGE = {
  url: "https://apply.productizeyourself.ai/images/assets/social-preview-hero.jpg",
  width: 1200,
  height: 630,
  alt: "Productize Yourself with AI. Turn who you are into what you do, and build towards your first $5k or $10k month.",
};

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: "%s | Productize Yourself with AI",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  category: "education",
  authors: [{ name: SITE.founder, url: SITE.founderUrl }],
  creator: SITE.founder,
  publisher: SITE.org,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_GB",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
