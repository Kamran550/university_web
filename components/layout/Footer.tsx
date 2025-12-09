"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const contactInfo = {
  phone: "+48 12 345 6789",
  email: "info@eipu.edu",
  address: "ul. Krakowska 23, 00-000 Warsaw, Poland",
};

export function Footer() {
  const t = useTranslations("footer");
  const tLinks = useTranslations("footer.links");
  const tUniversityLinks = useTranslations("footer.universityLinks");
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", key: "about" },
    { href: "/programs", key: "programs" },
    { href: "/fees", key: "fees" },
    { href: "/contact", key: "contact" },
    { href: "/apply", key: "apply" },
  ];

  const universityLinks = [
    { key: "academicPrograms" },
    { key: "researchInnovation" },
    { key: "studentLife" },
    { key: "admissions" },
  ];

  return (
    <footer className="bg-slate-950 text-gray-300 dark:bg-black border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo və Açıqlama */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative transition-transform group-hover:scale-105">
                <Image
                  src="/images/EIPU-logo-dark.png"
                  alt="EIPU Logo"
                  width={250}
                  height={140}
                  className="object-contain h-20 md:h-24 w-auto"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 md:mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm md:text-base inline-block"
                  >
                    {tLinks(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4 md:mb-6">
              {t("contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm md:text-base break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-400 text-sm md:text-base">
                    {contactInfo.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 md:mb-6">
              {t("university")}
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              {universityLinks.map((link) => (
                <li key={link.key}>{tUniversityLinks(link.key)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              {t("copyright", { year: currentYear })}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                {t("termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
