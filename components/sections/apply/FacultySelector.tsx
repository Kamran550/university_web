"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Check, Languages } from "lucide-react";
import { Faculty } from "@/lib/types/faculty";
import { useTranslations } from "next-intl";

export type TeachingLanguage = "EN" | "TR";

interface FacultySelectorProps {
  faculties: Faculty[];
  selectedFacultyId: number | null;
  onSelect: (faculty: Faculty) => void;
  selectedLanguage: TeachingLanguage | null;
  onLanguageSelect: (language: TeachingLanguage) => void;
}

export default function FacultySelector({
  faculties,
  selectedFacultyId,
  onSelect,
  selectedLanguage,
  onLanguageSelect,
}: FacultySelectorProps) {
  const t = useTranslations("apply.facultySelector");
  const langT = useTranslations("apply.facultySelector.languageSelection");

  if (faculties.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noFaculties")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {t("title")}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">{t("subtitle")}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
            {faculties.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <Button
                  variant={
                    selectedFacultyId === faculty.id ? "default" : "outline"
                  }
                  className={`w-full h-auto p-4 flex items-center justify-between gap-2 ${
                    selectedFacultyId === faculty.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary"
                  }`}
                  onClick={() => onSelect(faculty)}
                >
                  <span className="font-semibold text-left flex-1">
                    {faculty.name}
                  </span>
                  {selectedFacultyId === faculty.id && (
                    <Check className="w-4 h-4 shrink-0" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          {selectedFacultyId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {t("selected")}:{" "}
                <span className="font-semibold">
                  {faculties.find((f) => f.id === selectedFacultyId)?.name}
                </span>
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Teaching Language Selection */}
      {selectedFacultyId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                {langT("title")}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {langT("subtitle")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={selectedLanguage === "EN" ? "default" : "outline"}
                  className={`w-full h-auto p-4 flex items-center justify-between gap-2 ${
                    selectedLanguage === "EN"
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary"
                  }`}
                  onClick={() => onLanguageSelect("EN")}
                >
                  <span className="font-semibold text-left flex-1">
                    🇬🇧 {langT("english")}
                  </span>
                  {selectedLanguage === "EN" && (
                    <Check className="w-4 h-4 shrink-0" />
                  )}
                </Button>
                <Button
                  variant={selectedLanguage === "TR" ? "default" : "outline"}
                  className={`w-full h-auto p-4 flex items-center justify-between gap-2 ${
                    selectedLanguage === "TR"
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary"
                  }`}
                  onClick={() => onLanguageSelect("TR")}
                >
                  <span className="font-semibold text-left flex-1">
                    🇹🇷 {langT("turkish")}
                  </span>
                  {selectedLanguage === "TR" && (
                    <Check className="w-4 h-4 shrink-0" />
                  )}
                </Button>
              </div>

              {selectedLanguage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {langT("selected")}:{" "}
                    <span className="font-semibold">
                      {selectedLanguage === "EN"
                        ? langT("english")
                        : langT("turkish")}
                    </span>
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
