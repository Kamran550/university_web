"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface LibraryResource {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
}

export default function ELibraryLogos() {
  const t = useTranslations("eLibrary");

  const resources: LibraryResource[] = [
    {
      id: "ankuni",
      name: t("resources.ankuni.name"),
      description: t("resources.ankuni.description"),
      image: "/images/ANKUNI.png",
      url: "https://ankara.edu.tr",
    },
    {
      id: "arxiv",
      name: t("resources.arxiv.name"),
      description: t("resources.arxiv.description"),
      image: "/images/ARXIV.jpg",
      url: "https://arxiv.org",
    },
    {
      id: "core",
      name: t("resources.core.name"),
      description: t("resources.core.description"),
      image: "/images/CORE.png",
      url: "https://core.ac.uk",
    },
    {
      id: "doaj",
      name: t("resources.doaj.name"),
      description: t("resources.doaj.description"),
      image: "/images/DOAJ.jpg",
      url: "https://doaj.org",
    },
    {
      id: "eric",
      name: t("resources.eric.name"),
      description: t("resources.eric.description"),
      image: "/images/ERIC.png",
      url: "https://eric.ed.gov",
    },
    {
      id: "mit-ocw",
      name: t("resources.mitOcw.name"),
      description: t("resources.mitOcw.description"),
      image: "/images/MIT-OCW.png",
      url: "https://ocw.mit.edu",
    },
    {
      id: "odtu-metu",
      name: t("resources.odtuMetu.name"),
      description: t("resources.odtuMetu.description"),
      image: "/images/ODTUMETU.jpg",
      url: "https://www.metu.edu.tr",
    },
    {
      id: "otl",
      name: t("resources.otl.name"),
      description: t("resources.otl.description"),
      image: "/images/OTL.jpg",
      url: "https://open.umn.edu",
    },
    {
      id: "sgh",
      name: t("resources.sgh.name"),
      description: t("resources.sgh.description"),
      image: "/images/SGH.png",
      url: "https://www.sgh.waw.pl",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-zinc-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("resources.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("resources.subtitle")}
          </p>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary"
              >
                {/* Logo Container */}
                <div className="relative h-48 md:h-56 bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-6 transition-colors duration-300 group-hover:bg-gray-100 dark:group-hover:bg-slate-700">
                  <div className="relative w-full h-full">
                    <Image
                      src={resource.image}
                      alt={resource.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            {t("resources.footer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

