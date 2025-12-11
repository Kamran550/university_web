"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "tr", label: "TR", flag: "🇹🇷" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Get pathname without locale prefix
      const segments = pathname.split("/");
      const pathWithoutLocale = segments.slice(2).join("/") || "";

      // Navigate to new locale
      router.push(
        `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ""}`
      );
      router.refresh();
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <Select
      value={locale}
      onValueChange={handleLanguageChange}
      disabled={isPending}
    >
      <SelectTrigger
        className="w-[80px] h-9 gap-1.5 border-gray-300 dark:border-gray-700 text-sm"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <span className="text-xs">{currentLanguage?.flag}</span>
            <span className="text-xs font-medium uppercase">
              {currentLanguage?.code}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span className="text-sm">{lang.flag}</span>
              <span className="text-sm font-medium uppercase">{lang.code}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
