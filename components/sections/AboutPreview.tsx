"use client";

import { aboutPreviewData } from "@/constants/about";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AboutPreview() {
  const t = useTranslations("aboutPreview");
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}

        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={aboutPreviewData.image}
              alt="University campus"
              width={700}
              height={500}
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>

          <p className="text-gray-600 text-lg mb-6">{t("description")}</p>

          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {t("button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
