"use client";

import { motion } from "framer-motion";
import { Calendar, BookOpen, Users, Award, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const milestoneYears = ["2020", "2021", "2022", "2023"] as const;
const milestoneIcons = [BookOpen, GraduationCap, Award, Users] as const;

export default function AboutHistory() {
  const t = useTranslations("about.history");

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
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

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500"></div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-0">
            {milestoneYears.map((year, index) => {
              const Icon = milestoneIcons[index];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-6 md:gap-12 relative`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : ""}`}>
                    <div
                      className={`inline-flex items-center gap-3 mb-3 ${
                        isEven ? "md:ml-auto md:flex-row-reverse" : ""
                      }`}
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {t(`milestones.${year}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(`milestones.${year}.description`)}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 border-primary shadow-lg flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block flex-1"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/about-campus.jpg"
            alt="EIPU Campus"
            width={1200}
            height={600}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
