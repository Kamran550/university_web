import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eipu.edu.pl";
  const locales = ["en", "tr", "ru"];
  const currentDate = new Date();

  // Əsas səhifələr
  const pages = [
    "", // Ana səhifə
    "/about", // Haqqımızda
    "/programs", // Proqramlar
    "/fees", // Ödəniş
    "/contact", // Əlaqə
    "/apply", // Müraciət
    "/news", // Xəbərlər
  ];

  // Bütün dillər üçün URL-lər yaradaq
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Hər səhifə üçün bütün dil versiyalarını əlavə et
  pages.forEach((page) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}${page}`;

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page === "/programs" ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            tr: `${baseUrl}/tr${page}`,
            ru: `${baseUrl}/ru${page}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
