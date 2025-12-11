"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, Check } from "lucide-react";
import { ProgramService } from "@/lib/services/program.service";
import { Program } from "@/lib/types/program";
import { ApiClientError } from "@/lib/api/client";
import { useTranslations } from "next-intl";

interface ProgramSelectorProps {
  onSelect: (program: Program) => void;
  selectedProgramId?: number;
  degreeId: number;
  facultyId: number;
  teachingLanguage: "EN" | "TR";
}

export default function ProgramSelector({
  onSelect,
  selectedProgramId,
  degreeId,
  facultyId,
  teachingLanguage,
}: ProgramSelectorProps) {
  const t = useTranslations("apply.programSelector");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProgramService.getByDegreeAndFaculty(
        degreeId,
        facultyId,
        teachingLanguage
      );
      console.log("programs data", data);
      setPrograms(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : err instanceof Error
          ? err.message
          : t("error");
      setError(errorMessage);
      console.error("Failed to fetch programs:", err);
    } finally {
      setLoading(false);
    }
  }, [degreeId, facultyId, teachingLanguage, t]);

  useEffect(() => {
    if (degreeId && facultyId) {
      fetchPrograms();
    }
  }, [degreeId, facultyId, fetchPrograms]);

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("loading")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-destructive">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{t("error")}</p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" onClick={fetchPrograms}>
              {t("retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (programs.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noPrograms")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {t("title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{t("subtitle")}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={
                  selectedProgramId === program.id ? "default" : "outline"
                }
                className={`w-full h-auto p-4 flex flex-col items-start gap-2 ${
                  selectedProgramId === program.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
                onClick={() => onSelect(program)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold text-left">
                      {program.name}
                    </span>
                    {program.price_per_year && (
                      <span className="text-xs opacity-80">
                        ${program.price_per_year}/year
                      </span>
                    )}
                  </div>
                  {selectedProgramId === program.id && (
                    <Check className="w-4 h-4 shrink-0" />
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
