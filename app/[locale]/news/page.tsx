import NewsHero from "@/components/sections/news/NewsHero";
import NewsGrid from "@/components/sections/news/NewsGrid";
import NewsletterSection from "@/components/sections/news/NewsletterSection";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <NewsHero />
      <NewsGrid />
      <NewsletterSection />
    </main>
  );
}
