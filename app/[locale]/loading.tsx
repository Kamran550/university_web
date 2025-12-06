"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/80 backdrop-blur-sm dark:bg-black/80">
      {/* Loading Container */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Spinner */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="h-16 w-16 rounded-full border-4 border-zinc-200 dark:border-zinc-700"
            style={{ borderTopColor: "#3b82f6" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Inner Pulse */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* EIPU Text */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="text-xl font-bold tracking-wider text-zinc-800 dark:text-white">
            EIPU
          </span>
          
          {/* Loading Dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

