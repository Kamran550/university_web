"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return <Navbar />;
}

function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/fees`, label: t("fees") },
    { href: `/${locale}/programs`, label: t("programs") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const aboutDropdownItems = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/about/rectorate`, label: t("rectorate") },
    {
      href: `/${locale}/about/administrative-units`,
      label: t("administrativeUnits"),
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-slate-800"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28 lg:h-32">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center group shrink-0"
          >
            <div className="relative transition-transform group-hover:scale-105">
              <Image
                src="/images/EIPU-logo.png"
                alt="EIPU Logo"
                width={360}
                height={204}
                className="object-contain h-20 md:h-24 lg:h-28 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {/* About Dropdown */}
            <div
              ref={aboutDropdownRef}
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button className="px-4 py-2 text-base xl:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1">
                {t("about")}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    aboutDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden z-50">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setAboutDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-base xl:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Button
              asChild
              size="lg"
              className="ml-2 xl:ml-4 bg-primary hover:bg-primary/90 text-white text-base xl:text-lg px-6 xl:px-8"
            >
              <Link href={`/${locale}/apply`}>{t("apply")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center">
                    <Image
                      src="/images/EIPU-logo-tam.jpg"
                      alt="EIPU Logo"
                      width={200}
                      height={80}
                      className="object-contain h-12 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col mt-8 space-y-4">
                  {/* About in Mobile */}
                  <div className="px-4">
                    <button
                      onClick={() =>
                        setMobileAboutDropdownOpen(!mobileAboutDropdownOpen)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>{t("about")}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          mobileAboutDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileAboutDropdownOpen && (
                      <div className="flex flex-col space-y-2 ml-4 mt-2">
                        {aboutDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileAboutDropdownOpen(false);
                            }}
                            className="px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 px-4">
                    <LanguageSwitcher />
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="mt-4 w-full bg-primary hover:bg-primary/90 text-white text-lg py-6"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href={`/${locale}/apply`}>{t("apply")}</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
