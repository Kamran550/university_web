"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Wallet, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const planKeys = [
  "fullPayment",
  "semesterPayment",
  "monthlyPayment",
  "installmentPlan",
] as const;
const planIcons = [DollarSign, Calendar, CreditCard, Wallet] as const;
const planDiscounts = ["10%", "5%", "0%", "Custom"] as const;
const planRecommended = [false, true, false, false] as const;

export default function PaymentPlans() {
  const t = useTranslations("fees.paymentPlans");
  const locale = useLocale();

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

        {/* Payment Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {planKeys.map((key, index) => {
            const Icon = planIcons[index];
            const discount = planDiscounts[index];
            const recommended = planRecommended[index];
            const plan = {
              name: t(`plans.${key}.name`),
              description: t(`plans.${key}.description`),
              benefits: t.raw(`plans.${key}.benefits`) as string[],
              recommended,
            };
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <Card
                  className={`h-full flex flex-col shadow-lg hover:shadow-xl transition-all ${
                    plan.recommended
                      ? "border-2 border-primary bg-primary/5"
                      : "border"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {t("recommended")}
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">
                      {plan.name}
                    </CardTitle>
                    {discount !== "Custom" && (
                      <div className="text-2xl font-bold text-primary">
                        {discount} {t("off")}
                      </div>
                    )}
                    {discount === "Custom" && (
                      <div className="text-lg font-semibold text-primary">
                        {t("customTerms")}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 flex-1 mb-6">
                      {plan.benefits.map((benefit: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href={`/contact`}>{t("contact")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
