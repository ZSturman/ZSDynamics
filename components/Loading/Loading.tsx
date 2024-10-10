import { motion } from "framer-motion";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loader-overlay">
      <motion.div
        className="loader"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </motion.div>
    </div>
  );
};

export default Loading;
