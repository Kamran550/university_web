"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "#",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "#",
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-100 dark:bg-sky-900",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "#",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "#",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900",
  },
];

export default function ContactSocial() {
  const t = useTranslations("contact.social");

  return (
    <section className="py-20 bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {t("followUs")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("subtitle")}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-14 h-14 rounded-full ${social.bgColor} flex items-center justify-center ${social.color} hover:shadow-lg transition-shadow`}
                        aria-label={social.name}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="shadow-lg h-full">
              <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <HelpCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {t("haveQuestions")}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm max-w-sm">
                  {t("faqDescription")}
                </p>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/fees#faq">
                    <MessageCircle className="w-4 h-4" />
                    {t("viewFAQ")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
