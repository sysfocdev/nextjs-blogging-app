"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black z-[999999]">
      {/* Animated Logo Circle */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-28 h-28 rounded-full border-4 border-purple-500"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />
        <motion.span
          className="absolute text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Loading
        </motion.span>
      </motion.div>

      {/* Glowing Pulse */}
      <motion.div
        className="absolute bottom-16 text-lg font-semibold text-gray-300"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading your experience...
      </motion.div>
    </div>
  );
}
