import { notFound } from "next/navigation";
import { news } from "@/constants/news";
import NewsDetail from "@/components/sections/news/NewsDetail";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = news.find((item) => item.slug === slug);

  if (!newsItem) {
    notFound();
  }

  // Get related news (same category, excluding current)
  const relatedNews = news
    .filter(
      (item) =>
        item.id !== newsItem.id &&
        item.category === newsItem.category &&
        !item.featured
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <NewsDetail newsItem={newsItem} relatedNews={relatedNews} />
    </main>
  );
}
