"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  GraduationCap,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const scholarshipKeys = [
  "academicExcellence",
  "meritBased",
  "needBased",
  "internationalStudents",
  "researchFellowships",
] as const;
const scholarshipIcons = [
  GraduationCap,
  Award,
  DollarSign,
  Users,
  TrendingUp,
] as const;
const scholarshipCoverages = [
  "50-100%",
  "25-75%",
  "30-80%",
  "40-60%",
  "Full Coverage",
] as const;
const scholarshipColors = [
  "blue",
  "purple",
  "green",
  "indigo",
  "orange",
] as const;
const scholarshipDeadlines = [
  "March 15, 2025",
  "April 1, 2025",
  "May 1, 2025",
  "March 30, 2025",
  "February 28, 2025",
] as const;

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  indigo:
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400",
  orange:
    "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400",
};

export default function Scholarships() {
  const t = useTranslations("fees.scholarships");
  const locale = useLocale();

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

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {scholarshipKeys.map((key, index) => {
            const Icon = scholarshipIcons[index];
            const coverage = scholarshipCoverages[index];
            const color = scholarshipColors[index];
            const deadline = scholarshipDeadlines[index];
            const scholarship = {
              name: t(`items.${key}.name`),
              description: t(`items.${key}.description`),
              eligibility: t.raw(`items.${key}.eligibility`) as string[],
              color,
            };
            return (
              <motion.div
                key={scholarship.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl ${
                          colorClasses[
                            scholarship.color as keyof typeof colorClasses
                          ]
                        } flex items-center justify-center`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {coverage}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("coverage")}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">
                      {scholarship.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {scholarship.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">
                        {t("eligibility")}:
                      </h4>
                      <ul className="space-y-1">
                        {scholarship.eligibility.map(
                          (item: string, idx: number) => (
                            <li
                              key={idx}
                              className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-primary mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mt-auto pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">
                        {t("applicationDeadline")}:
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {deadline}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href={`/apply`}>{t("apply")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
