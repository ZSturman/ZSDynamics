"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomeScreen() {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(to right, #f0f4ff, #e0e7ff)",
            "linear-gradient(to right, #e0e7ff, #f0f4ff)",
            "linear-gradient(to right, #f0f4ff, #e0e7ff)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

      {/* Content */}
      <motion.div
        className="z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-5xl font-bold text-gray-800 mb-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          ZSDynamics
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Are you asking the right question?
        </motion.p>

        <div className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={navigateToDashboard}
              className="rounded-full p-8 text-4xl  bg-transparent text-blue-500 hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              ?
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
