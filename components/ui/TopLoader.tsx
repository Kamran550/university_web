"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Yeni route-a keçid başlayanda
    setLoading(true);
    setProgress(0);

    // Progress simulyasiyası
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 200);
    const timer3 = setTimeout(() => setProgress(80), 400);
    const timer4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 200);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[100] h-1 bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-blue-500/50"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          {/* Glow Effect */}
          <motion.div
            className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white/50 to-transparent"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

