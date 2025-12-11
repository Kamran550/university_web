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
    default: "EIPU - European International Peace University | Study in Poland",
    template: "%s | EIPU - European International Peace University",
  },
  description:
    "EIPU - European International Peace University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",

  // Açar sözlər
  keywords: [
    "EIPU",
    "eipu",
    "European International Peace University",
    "eipu.edu.pl",
    "Poland university",
    "Polish university",
    "international university Poland",
    "international university",
    "peace university",
    "European university",
    "study in Poland",
    "education in Poland",
    "PhD Poland",
    "PhD in Poland",
    "bachelor degree Poland",
    "bachelor programs in Poland",
    "master degree Poland",
    "master programs in Poland",
    "doctoral programs in Poland",
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
      ru: "/ru",
      tr: "/tr",
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "tr_TR"],
    url: "https://eipu.edu.pl",
    siteName: "EIPU - European International Peace University",
    title: "EIPU - European International Peace University | Study in Poland",
    description:
      "EIPU - European International Peace University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",
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
      "EIPU - European International Peace University. International education in Poland with bachelor's, master's and PhD programs.",
    images: ["/images/EIPU-logo-tam.jpg"],
    creator: "@eipu_edu",
    site: "@eipu_edu",
  },

  // Verification (Google Search Console, Bing, etc.)
  verification: {
    google: "KLaSW1pDoMKO_L3uMzk9eMceecJ5d0d7Pvke5ldZkNs", // Google Search Console-dan alınacaq
    // yandex: "YOUR_YANDEX_CODE",
    // bing: "YOUR_BING_CODE",
  },

  // Category
  category: "education",

  // Icons / Favicon
  icons: {
    icon: [
      { url: "/images/EIPU-logo.png", sizes: "any", type: "image/png" },
      { url: "/images/EIPU-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/EIPU-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/EIPU-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/EIPU-logo.png",
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
