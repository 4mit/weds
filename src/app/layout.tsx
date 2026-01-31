import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soni-wedding.com';
const siteName = "Soni Family Wedding";
const weddingDate = "February 20, 2026";
const couples = "Amit & Ranjana, Laxminarayan & Pratima";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Interactive Wedding Journey | ${weddingDate}`,
    template: `%s | ${siteName}`
  },
  description: `Join us for the beautiful wedding celebration of ${couples} on ${weddingDate}. Experience our interactive wedding journey featuring Mehendi, Haldi, Sangeet, Engagement, Barat, Wedding, Reception, and Satyanarayan Katha Puja ceremonies. Soni Family Wedding - A celebration of love and tradition.`,
  keywords: [
    "Soni Family Wedding",
    "Wedding Invitation",
    "Indian Wedding",
    "Wedding Journey",
    "Amit Ranjana Wedding",
    "Laxminarayan Pratima Wedding",
    "Mehendi Ceremony",
    "Haldi Ceremony",
    "Sangeet",
    "Barat",
    "Wedding Ceremony",
    "Reception",
    "February 2026 Wedding",
    "Interactive Wedding",
    "Wedding Website",
    "Digital Wedding Invitation",
    "Wedding Events",
    "Satyanarayan Katha Puja"
  ],
  authors: [{ name: "Soni Family" }],
  creator: "Soni Family",
  publisher: "Soni Family",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💒</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💒</text></svg>",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Soni Wedding",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Interactive Wedding Journey`,
    description: `Join us for the beautiful wedding celebration of ${couples} on ${weddingDate}. Experience our interactive wedding journey.`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Wedding Celebration`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Interactive Wedding Journey`,
    description: `Join us for the beautiful wedding celebration of ${couples} on ${weddingDate}.`,
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@sonifamily",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Wedding",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased no-select">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

