"use client";

import { heroData } from "@/constants/hero";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");
  return (
    <section
      className="relative w-full min-h-[80vh] flex items-center justify-center bg-cover bg-center pt-24 md:pt-28 lg:pt-32"
      style={{
        backgroundImage: `url(${heroData.backgroundImage})`,
      }}
    >
      {/* Overlay (qara şəffaf layer) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-white/90 mb-8"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-4"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Button asChild size="lg" className="text-sm md:text-base">
            <Link href="/apply">{t("primaryButton")}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-sm md:text-base bg-white/90 text-black hover:bg-white border-white/20"
          >
            <Link href="/programs">{t("secondaryButton")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
