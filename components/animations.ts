export const entranceAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };
  
  export const scaleAnimation = {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };