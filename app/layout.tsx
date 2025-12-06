import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Əsas məlumatlar
  title: {
    default:
      "EIPU - European International Peace University | Avropa Beynəlxalq Sülh Universiteti",
    template: "%s | EIPU - European International Peace University",
  },
  description:
    "EIPU - European International Peace University (Avropa Beynəlxalq Sülh Universiteti). Polşada beynəlxalq təhsil, bakalavr, magistr və doktorantura proqramları. Sülh və qlobal anlaşma vasitəsilə təhsil.",

  // Açar sözlər
  keywords: [
    "EIPU",
    "eipu",
    "European International Peace University",
    "Avropa Beynəlxalq Sülh Universiteti",
    "eipu.edu.pl",
    "Polşa universiteti",
    "beynəlxalq universitet",
    "Polşada təhsil",
    "Poland university",
    "international university Poland",
    "peace university",
    "sülh universiteti",
    "Avropa universiteti",
    "European university",
    "study in Poland",
    "Polşada oxumaq",
    "bakalavr proqramları",
    "magistr proqramları",
    "doktorantura",
    "PhD Poland",
    "bachelor degree Poland",
    "master degree Poland",
  ],

  // Müəllif və yaradıcı
  authors: [
    {
      name: "European International Peace University",
      url: "https://eipu.edu.pl",
    },
  ],
  creator: "EIPU - European International Peace University",
  publisher: "European International Peace University",

  // Robots
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

  // Canonical URL
  metadataBase: new URL("https://eipu.edu.pl"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      az: "/az",
      tr: "/tr",
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["az_AZ", "tr_TR"],
    url: "https://eipu.edu.pl",
    siteName: "EIPU - European International Peace University",
    title:
      "EIPU - European International Peace University | Avropa Beynəlxalq Sülh Universiteti",
    description:
      "EIPU - European International Peace University. Polşada beynəlxalq təhsil, bakalavr, magistr və doktorantura proqramları. Sülh və qlobal anlaşma vasitəsilə keyfiyyətli təhsil.",
    images: [
      {
        url: "/images/EIPU-logo-tam.jpg",
        width: 1200,
        height: 630,
        alt: "EIPU - European International Peace University Logo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "EIPU - European International Peace University",
    description:
      "EIPU - Polşada beynəlxalq təhsil. Bakalavr, magistr və doktorantura proqramları.",
    images: ["/images/EIPU-logo-tam.jpg"],
    creator: "@eipu_edu",
    site: "@eipu_edu",
  },

  // Verification (Google Search Console, Bing, etc.)
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Google Search Console-dan alınacaq
    // yandex: "YOUR_YANDEX_CODE",
    // bing: "YOUR_BING_CODE",
  },

  // Category
  category: "education",

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/images/EIPU-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
