"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import { NewsItem } from "@/constants/news";
import { useTranslations } from "next-intl";

interface NewsDetailProps {
  newsItem: NewsItem;
  relatedNews: NewsItem[];
}

export default function NewsDetail({ newsItem, relatedNews }: NewsDetailProps) {
  const t = useTranslations("news.detail");
  const formattedDate = new Date(newsItem.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoryColors: Record<string, string> = {
    university: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
    events:
      "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
    announcements:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
    academic:
      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
    "student-life":
      "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400",
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/news">
              <ArrowLeft className="w-4 h-4" />
              {t("backToNews")}
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${
                categoryColors[newsItem.category] || "bg-gray-100 text-gray-600"
              }`}
            >
              {newsItem.category.replace("-", " ")}
            </span>
            {newsItem.featured && (
              <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                {t("featured")}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {newsItem.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground pb-6 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{newsItem.author}</span>
            </div>
            {newsItem.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {newsItem.readTime} {t("minRead")}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto gap-2"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: newsItem.title,
                    text: newsItem.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(t("linkCopied"));
                }
              }}
            >
              <Share2 className="w-4 h-4" />
              {t("share")}
            </Button>
          </div>
        </motion.div>

        {/* Featured Image */}
        {newsItem.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />
        </motion.article>

        {/* Tags */}
        {newsItem.tags && newsItem.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 pt-6 border-t"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t("tags")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related News */}
        {relatedNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {t("relatedNews")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((item, index) => (
                <RelatedNewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Back Button Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t text-center"
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/news">
              <ArrowLeft className="w-4 h-4" />
              {t("backToAllNews")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedNewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: "-50px" }}
      className="group"
    >
      <Link href={`/news/${item.slug}`}>
        <Card className="h-full shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer group-hover:border-primary">
          {item.image && (
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3" />
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {item.excerpt}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
