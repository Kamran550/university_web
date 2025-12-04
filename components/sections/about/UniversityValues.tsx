"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Globe,
  Users,
  Lightbulb,
  Shield,
  Award,
} from "lucide-react";
import { useTranslations } from "next-intl";

const valueKeys = [
  "academicExcellence",
  "globalPerspective",
  "inclusiveCommunity",
  "innovation",
  "integrity",
  "excellence",
] as const;

const valueIcons = [
  GraduationCap,
  Globe,
  Users,
  Lightbulb,
  Shield,
  Award,
] as const;

const valueColors = [
  "blue",
  "green",
  "purple",
  "yellow",
  "indigo",
  "red",
] as const;

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  yellow:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
  indigo:
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
};

export default function UniversityValues() {
  const t = useTranslations("about.values");

  return (
    <section className="py-20 bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {valueKeys.map((key, index) => {
            const Icon = valueIcons[index];
            const color = valueColors[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700">
                  <div
                    className={`w-14 h-14 rounded-xl ${
                      colorClasses[color as keyof typeof colorClasses]
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
