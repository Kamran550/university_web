"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  GraduationCap,
  Users,
  Briefcase,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Program } from "@/constants/programs";
import { useTranslations } from "next-intl";

interface ProgramDetailsProps {
  program: Program;
}

export default function ProgramDetails({ program }: ProgramDetailsProps) {
  const t = useTranslations("programs.details");
  const categoryColors: Record<string, string> = {
    undergraduate:
      "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
    graduate:
      "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
    doctoral:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400",
    online: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
    professional:
      "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400",
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/programs">
              <ArrowLeft className="w-4 h-4" />
              {t("backToPrograms")}
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span
              className={`text-sm font-semibold px-4 py-2 rounded-full ${
                categoryColors[program.category] || "bg-gray-100 text-gray-600"
              }`}
            >
              {program.degree}
            </span>
            {program.featured && (
              <span className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full">
                {t("featured")}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {program.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {program.description}
          </p>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("duration")}
                  </p>
                  <p className="text-lg font-semibold">{program.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("degreeType")}
                  </p>
                  <p className="text-lg font-semibold">{program.degree}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("category")}
                  </p>
                  <p className="text-lg font-semibold capitalize">
                    {program.category}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Features & Career */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t("programFeatures")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    {t("careerOpportunities")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {program.career.map((career, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg border"
                      >
                        <p className="font-medium text-gray-900 dark:text-white">
                          {career}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle>{t("readyToApply")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("applyDescription", { title: program.title })}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link href="/apply">{t("applyNow")}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">{t("contactAdmissions")}</Link>
                </Button>
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    {t("questions")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
