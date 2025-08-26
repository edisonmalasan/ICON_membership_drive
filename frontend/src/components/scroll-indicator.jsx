import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";

export const ScrollIndicator = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textColor = "text-gray-400";
  const borderColor = "border-gray-400";
  const dotColor = "bg-gray-400";

  return (
    <AnimatePresence>
      {showScrollIndicator && (
        <motion.div
          ref={indicatorRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 sm:display-none hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`flex flex-col items-center gap-2 ${textColor}`}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div
              className={`w-6 h-10 border-2 ${borderColor} rounded-full flex justify-center`}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`w-1 h-3 ${dotColor} rounded-full mt-2`}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
