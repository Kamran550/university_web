"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdministrativeUnitsPage() {
  const t = useTranslations("about.administrativeUnits");

  const staff = [
    {
      id: "vice-rector",
      image: "/images/vice-rector.png",
      positionKey: "viceRector.position",
      nameKey: "viceRector.name",
      emailKey: "viceRector.email",
    },
    {
      id: "rector-advisor",
      image: "/images/rector-advisor.png",
      positionKey: "rectorAdvisor.position",
      nameKey: "rectorAdvisor.name",
      emailKey: "rectorAdvisor.email",
    },
    {
      id: "secretary-general",
      image: "/images/secretary-general.png",
      positionKey: "secretaryGeneral.position",
      nameKey: "secretaryGeneral.name",
      emailKey: "secretaryGeneral.email",
    },
    {
      id: "office-director",
      image: "/images/office-director.png",
      positionKey: "officeDirector.position",
      nameKey: "officeDirector.name",
      emailKey: "officeDirector.email",
    }
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-black dark:to-slate-950 font-sans pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {t("title")}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="space-y-8">
          {staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-1/3 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 p-8 md:p-12 flex items-center justify-center">
                    <div className="relative w-full max-w-xs aspect-square">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-slate-800/50">
                        <Image
                          src={member.image}
                          alt={t(member.nameKey)}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          {t(member.positionKey)}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        {t(member.nameKey)}
                      </h2>
                      <div className="h-1 w-20 bg-linear-to-r from-primary to-primary/50 rounded-full"></div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-linear-to-r from-gray-50 to-transparent dark:from-slate-800/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
                      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${t(member.emailKey)}`}
                          className="text-base font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group"
                        >
                          {t(member.emailKey)}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}



