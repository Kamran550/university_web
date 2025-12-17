"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Award, GraduationCap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RectoratePage() {
  const t = useTranslations("about.rectorate");
  const [activeTab, setActiveTab] = useState<"profile" | "welcomeMessage">(
    "profile"
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-black dark:to-slate-950 font-sans pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {t("title")}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leadership, Excellence, and Vision for Higher Education
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 border border-gray-200/50 dark:border-slate-700/50 shadow-lg">
            <button
              onClick={() => setActiveTab("profile")}
              className={`
                relative px-8 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300
                ${
                  activeTab === "profile"
                    ? "text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                }
              `}
            >
              {activeTab === "profile" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t("tabs.profile")}</span>
            </button>
            <button
              onClick={() => setActiveTab("welcomeMessage")}
              className={`
                relative px-8 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300
                ${
                  activeTab === "welcomeMessage"
                    ? "text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                }
              `}
            >
              {activeTab === "welcomeMessage" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t("tabs.welcomeMessage")}</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "profile" ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden"
              >
                <div className="lg:flex">
                  {/* Rector Image */}
                  <div className="lg:w-2/5 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 p-12 flex items-center justify-center relative overflow-hidden">
                    <div className="relative z-10 w-full max-w-md">
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-slate-800/50">
                        <Image
                          src="/images/rector.png"
                          alt={t("profile.fullNameValue")}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            Rector
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="lg:w-3/5 p-8 md:p-12 lg:p-16">
                    <div className="mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        {t("profile.title")}
                      </h2>
                      <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid gap-4 mb-8">
                      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent dark:from-slate-800/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
                        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            {t("profile.fullName")}
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {t("profile.fullNameValue")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-linear-to-r from-gray-50 to-transparent dark:from-slate-800/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
                        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            {t("profile.position")}
                          </p>
                          <p className="text-base font-semibold text-gray-900 dark:text-white leading-relaxed">
                            {t("profile.positionValue")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-linear-to-r from-gray-50 to-transparent dark:from-slate-800/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
                        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            {t("profile.email")}
                          </p>
                          <a
                            href={`mailto:${t("profile.emailValue")}`}
                            className="text-base font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group"
                          >
                            {t("profile.emailValue")}
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-6">
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                          {t("profile.description")}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mt-4">
                          {t("profile.qualifications")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="welcomeMessage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 p-8 md:p-12 lg:p-16"
              >
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {t("welcomeMessage.title")}
                  </h2>
                  <div className="h-1 w-24 bg-linear-to-r from-primary to-primary/50 rounded-full"></div>
                </div>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="font-semibold text-xl text-gray-900 dark:text-white mb-6">
                      {t("welcomeMessage.greeting")}
                    </p>
                    <p className="text-base leading-relaxed">
                      {t("welcomeMessage.paragraph1")}
                    </p>
                    <p className="text-base leading-relaxed">
                      {t("welcomeMessage.paragraph2")}
                    </p>
                    <p className="text-base leading-relaxed">
                      {t("welcomeMessage.paragraph3")}
                    </p>
                    <p className="text-base leading-relaxed mt-8 font-medium">
                      {t("welcomeMessage.closing")}
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          {t("welcomeMessage.signature")}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {t("welcomeMessage.signatureName")}
                        </p>
                        <p className="text-lg text-primary font-semibold mt-1">
                          {t("welcomeMessage.signatureTitle")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-6 py-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                        <Award className="h-6 w-6 text-primary" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Official Seal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
