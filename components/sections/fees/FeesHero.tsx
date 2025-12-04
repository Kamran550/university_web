"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function FeesHero() {
  const t = useTranslations("fees.hero");

  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 pt-24 md:pt-28 lg:pt-32">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
