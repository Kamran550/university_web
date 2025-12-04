"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { teachers } from "@/constants/teacher";
import { useTranslations } from "next-intl";

export function TeachersSection() {
  const t = useTranslations("teachers");

  return (
    <section className="py-20 bg-linear-to-b from-white to-slate-100 dark:from-black dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground mt-2 text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="shadow-md hover:shadow-xl transition-all rounded-xl overflow-hidden p-0 gap-0 flex flex-col">
                <div className="relative w-full aspect-3/4">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {teacher.title}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
