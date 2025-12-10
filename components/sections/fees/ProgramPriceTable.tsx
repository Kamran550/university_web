"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const programKeys = ["bachelors", "masters", "doctoral", "online"] as const;
const programConfig = [
  { annualFee: 4000, totalFee: 14000, popular: false },
  { annualFee: 4000, totalFee: 14000, popular: true },
  { annualFee: 4000, totalFee: 14000, popular: false },
  { annualFee: 2800, totalFee: 8400, popular: false },
] as const;

export default function ProgramPriceTable() {
  const t = useTranslations("fees.priceTable");

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

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {programKeys.map((key, index) => {
            const config = programConfig[index];
            const program = {
              ...config,
              name: t(`programs.${key}.name`),
              duration: t(`programs.${key}.duration`),
              features: t.raw(`programs.${key}.features`) as string[],
            };
            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <Card
                  className={`h-full flex flex-col shadow-lg hover:shadow-xl transition-all ${
                    program.popular
                      ? "border-2 border-primary scale-105 lg:scale-110"
                      : "border"
                  }`}
                >
                  {program.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {t("mostPopular")}
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold mb-2">
                      {program.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {program.duration}
                    </p>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-primary">
                        €{program.annualFee.toLocaleString()}
                        <span className="text-sm text-muted-foreground font-normal">
                          {t("year")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("total")}: €{program.totalFee.toLocaleString()}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {program.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">{t("note")}</p>
        </motion.div>
      </div>
    </section>
  );
}
