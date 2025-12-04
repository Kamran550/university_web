"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap, Clock, ArrowRight } from "lucide-react";
import { programs, categories, Program } from "@/constants/programs";
import { useTranslations } from "next-intl";

export default function ProgramsGrid() {
  const t = useTranslations("programs.grid");
  const tCategories = useTranslations("programs.categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter programs based on category and search
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory =
        selectedCategory === "all" || program.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.degree.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : ""
                  }
                >
                  {tCategories(category.id)}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        {filteredPrograms.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-6 text-sm text-muted-foreground"
          >
            {t("found")} {filteredPrograms.length}{" "}
            {filteredPrograms.length === 1
              ? t("programs")
              : t("programsPlural")}
          </motion.div>
        )}

        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPrograms.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center py-16"
          >
            <p className="text-lg text-muted-foreground">{t("noResults")}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              {t("clearFilters")}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const t = useTranslations("programs.grid");
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <Card
        className={`h-full flex flex-col shadow-lg hover:shadow-xl transition-all overflow-hidden ${
          program.featured ? "border-2 border-primary" : "border"
        }`}
      >
        {program.featured && (
          <div className="bg-primary text-white text-xs font-semibold px-4 py-1 text-center">
            {t("featuredProgram")}
          </div>
        )}
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                categoryColors[program.category] || "bg-gray-100 text-gray-600"
              }`}
            >
              {program.degree}
            </span>
            {program.featured && (
              <GraduationCap className="w-5 h-5 text-primary" />
            )}
          </div>
          <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {program.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{program.duration}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
            {program.description}
          </p>

          {/* Features */}
          <div className="mb-4 flex-1">
            <h4 className="font-semibold text-sm mb-2">{t("keyFeatures")}</h4>
            <ul className="space-y-1">
              {program.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={idx}
                  className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Opportunities */}
          <div className="mb-6 pt-4 border-t">
            <h4 className="font-semibold text-sm mb-2">{t("careerPaths")}</h4>
            <div className="flex flex-wrap gap-2">
              {program.career.slice(0, 2).map((career, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  {career}
                </span>
              ))}
              {program.career.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{program.career.length - 2} {t("more")}
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex gap-2">
            <Button asChild variant="outline" className="flex-1 group/btn">
              <Link href={`/programs/${program.id}`}>
                {t("learnMore")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/apply">{t("apply")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
