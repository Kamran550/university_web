"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, GraduationCap, Check } from "lucide-react";
import { DegreeService } from "@/lib/services/degree.service";
import { Degree } from "@/lib/types/degree";
import { ApiClientError } from "@/lib/api/client";
import { useTranslations } from "next-intl";

interface DegreeSelectorProps {
  onSelect: (degree: Degree) => void;
  selectedDegreeId?: number;
}

export default function DegreeSelector({
  onSelect,
  selectedDegreeId,
}: DegreeSelectorProps) {
  const t = useTranslations("apply.degreeSelector");
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDegrees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DegreeService.getAll();
      console.log("data", data);
      setDegrees(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : err instanceof Error
          ? err.message
          : t("error");
      setError(errorMessage);
      console.error("Failed to fetch degrees:", err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDegrees();
  }, [fetchDegrees]);

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
            <Button variant="outline" onClick={fetchDegrees}>
              {t("retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (degrees.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noDegrees")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          {t("title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{t("subtitle")}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {degrees.map((degree, index) => (
            <motion.div
              key={degree.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={selectedDegreeId === degree.id ? "default" : "outline"}
                className={`w-full h-auto p-4 flex flex-col items-start gap-2 ${
                  selectedDegreeId === degree.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
                onClick={() => onSelect(degree)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-left">{degree.name}</span>
                  {selectedDegreeId === degree.id && (
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
