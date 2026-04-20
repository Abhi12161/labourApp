

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center px-6"
      >
        {/* Slogan */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold"
        >
          💼 Rojgar Yahin Milega
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-3 text-lg md:text-xl opacity-90"
        >
          Trusted workers • Fast hiring • Local jobs
        </motion.p>

        {/* Winning glow effect */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-6 text-yellow-300 font-semibold"
        >
          ✨ Apna Rojgar Platform ✨
        </motion.div>
      </motion.div>
    </div>
  );
}
