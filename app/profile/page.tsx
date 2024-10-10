"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ComingSoonProfile = () => {
  const router = useRouter();

  return (
    <div className="coming-soon-page">
      <motion.div
        className="background-animation"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1, y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="content">
        <h1 className="title">Profile Page</h1>
        <p className="tagline">This feature is coming soon. Stay tuned!</p>
        <Button className="back-button" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonProfile;
