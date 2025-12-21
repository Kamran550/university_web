"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, Check, ArrowRightLeft } from "lucide-react";
import { useTranslations } from "next-intl";

type ApplicantType = "student" | "agency" | "transfer";

interface ApplicantTypeSelectorProps {
  selectedType: ApplicantType | null;
  onSelect: (type: ApplicantType) => void;
}

export default function ApplicantTypeSelector({
  selectedType,
  onSelect,
}: ApplicantTypeSelectorProps) {
  const t = useTranslations("apply.applicantType");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            {t("title")}
          </CardTitle>
          <p className="text-muted-foreground text-center mt-2">
            {t("subtitle")}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Option */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={selectedType === "student" ? "default" : "outline"}
                className={`w-full h-auto p-6 flex flex-col items-center gap-4 ${
                  selectedType === "student"
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
                onClick={() => onSelect("student")}
              >
                <div className="relative">
                  <User className="w-16 h-16" />
                  {selectedType === "student" && (
                    <Check className="w-6 h-6 absolute -top-2 -right-2 bg-white rounded-full text-primary" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{t("student")}</h3>
                  <p className="text-sm opacity-90">{t("studentDesc")}</p>
                </div>
              </Button>
            </motion.div>

            {/* Agency Option */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={selectedType === "agency" ? "default" : "outline"}
                className={`w-full h-auto p-6 flex flex-col items-center gap-4 ${
                  selectedType === "agency"
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
                onClick={() => onSelect("agency")}
              >
                <div className="relative">
                  <Building2 className="w-16 h-16" />
                  {selectedType === "agency" && (
                    <Check className="w-6 h-6 absolute -top-2 -right-2 bg-white rounded-full text-primary" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{t("agency")}</h3>
                  <p className="text-sm opacity-90">{t("agencyDesc")}</p>
                </div>
              </Button>
            </motion.div>

            {/* Transfer Option */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={selectedType === "transfer" ? "default" : "outline"}
                className={`w-full h-auto p-6 flex flex-col items-center gap-4 ${
                  selectedType === "transfer"
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
                onClick={() => onSelect("transfer")}
              >
                <div className="relative">
                  <ArrowRightLeft className="w-16 h-16" />
                  {selectedType === "transfer" && (
                    <Check className="w-6 h-6 absolute -top-2 -right-2 bg-white rounded-full text-primary" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{t("transfer")}</h3>
                  <p className="text-sm opacity-90">{t("transferDesc")}</p>
                </div>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
