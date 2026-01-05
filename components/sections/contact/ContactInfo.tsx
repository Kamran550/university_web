"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const contactInfo = {
  phone: {
    primary: "+48 579369968",
    secondary: "+48 579369968",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
  email: {
    primary: "info@eipu.edu",
    admissions: "international@eipu.edu",
    support: "rectorate@eipu.edu",
  },
  address: {
    street: "Ogrodowa 5800-876",
    city: "Warsaw, Poland",
    zip: "00-000",
    country: "Poland",
  },
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    sunday: "Sunday: Closed",
    saturday: "Saturday: Closed",
  },
};

export default function ContactInfo() {
  const t = useTranslations("contact.info");

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

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {t("phone")}
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`tel:${contactInfo.phone.primary.replace(
                        /\s/g,
                        ""
                      )}`}
                      className="block text-lg font-semibold text-primary hover:underline"
                    >
                      {contactInfo.phone.primary}
                    </a>
                    <a
                      href={`tel:${contactInfo.phone.secondary.replace(
                        /\s/g,
                        ""
                      )}`}
                      className="block text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      {contactInfo.phone.secondary}
                    </a>
                    <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {contactInfo.phone.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {t("email")}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${contactInfo.email.primary}`}
                      className="block text-sm font-semibold text-primary hover:underline break-all"
                    >
                      {contactInfo.email.primary}
                    </a>
                    <div className="space-y-1 pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t("admissions")}
                      </p>
                      <a
                        href={`mailto:${contactInfo.email.admissions}`}
                        className="block text-xs text-gray-600 dark:text-gray-300 hover:underline break-all"
                      >
                        {contactInfo.email.admissions}
                      </a>
                    </div>
                    <div className="space-y-1 pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t("support")}
                      </p>
                      <a
                        href={`mailto:${contactInfo.email.support}`}
                        className="block text-xs text-gray-600 dark:text-gray-300 hover:underline break-all"
                      >
                        {contactInfo.email.support}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {t("address")}
                  </h3>
                  <div className="space-y-1 text-gray-600 dark:text-gray-300">
                    <p className="font-medium">{contactInfo.address.street}</p>
                    <p>{contactInfo.address.city}</p>
                    <p className="text-sm">{contactInfo.address.zip}</p>
                    <p className="text-sm font-semibold mt-2">
                      {contactInfo.address.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Office Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">{t("officeHours")}</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>{t("hours.saturday")}</p>
                <p>{t("hours.sunday")}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
