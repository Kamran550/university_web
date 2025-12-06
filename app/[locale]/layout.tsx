import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { NavbarDemo } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SeoJsonLd } from "@/components/seo/JsonLd";
import { TopLoader } from "@/components/ui/TopLoader";
import type { Metadata } from "next";

// Hər dil üçün SEO məlumatları
const seoData: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  en: {
    title: "EIPU - European International Peace University | Study in Poland",
    description:
      "EIPU - European International Peace University. International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",
    keywords: [
      "EIPU",
      "European International Peace University",
      "study in Poland",
      "international university",
      "Poland education",
      "bachelor degree Poland",
      "master degree Poland",
      "PhD Poland",
      "European university",
      "peace university",
    ],
  },
  az: {
    title: "EIPU - Avropa Beynəlxalq Sülh Universiteti | Polşada Təhsil",
    description:
      "EIPU - Avropa Beynəlxalq Sülh Universiteti. Polşada beynəlxalq təhsil, bakalavr, magistr və doktorantura proqramları. Sülh və qlobal anlaşma vasitəsilə keyfiyyətli təhsil.",
    keywords: [
      "EIPU",
      "Avropa Beynəlxalq Sülh Universiteti",
      "Polşada təhsil",
      "Polşada oxumaq",
      "beynəlxalq universitet",
      "Polşa universiteti",
      "bakalavr proqramları",
      "magistr proqramları",
      "doktorantura",
      "Avropa universiteti",
    ],
  },
  tr: {
    title: "EIPU - Avrupa Uluslararası Barış Üniversitesi | Polonya'da Eğitim",
    description:
      "EIPU - Avrupa Uluslararası Barış Üniversitesi. Polonya'da uluslararası eğitim, lisans, yüksek lisans ve doktora programları. Barış ve küresel anlayış yoluyla kaliteli eğitim.",
    keywords: [
      "EIPU",
      "Avrupa Uluslararası Barış Üniversitesi",
      "Polonya'da eğitim",
      "Polonya'da okumak",
      "uluslararası üniversite",
      "Polonya üniversitesi",
      "lisans programları",
      "yüksek lisans programları",
      "doktora",
      "Avrupa üniversitesi",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoData[locale] || seoData.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://eipu.edu.pl/${locale}`,
      languages: {
        en: "https://eipu.edu.pl/en",
        az: "https://eipu.edu.pl/az",
        tr: "https://eipu.edu.pl/tr",
      },
    },
    openGraph: {
      locale: locale === "az" ? "az_AZ" : locale === "tr" ? "tr_TR" : "en_US",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <SeoJsonLd />
      <Suspense fallback={null}>
        <TopLoader />
      </Suspense>
      <NavbarDemo />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
