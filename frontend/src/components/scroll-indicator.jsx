import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";

export const ScrollIndicator = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // hide
      if (scrollPosition >= documentHeight - 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    const checkBackgroundColor = () => {
      if (indicatorRef.current) {
        const rect = indicatorRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const elementBelow = document.elementFromPoint(centerX, centerY);

        if (elementBelow) {
          const computedStyle = window.getComputedStyle(elementBelow);
          const backgroundColor = computedStyle.backgroundColor;

          if (backgroundColor) {
            const rgbMatch = backgroundColor.match(
              /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
            );
            if (rgbMatch) {
              const r = parseInt(rgbMatch[1]);
              const g = parseInt(rgbMatch[2]);
              const b = parseInt(rgbMatch[3]);

              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              setIsDarkBackground(brightness < 128);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", checkBackgroundColor);
    window.addEventListener("resize", checkBackgroundColor);

    checkBackgroundColor();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", checkBackgroundColor);
      window.removeEventListener("resize", checkBackgroundColor);
    };
  }, []);

  const textColor = isDarkBackground ? "text-white" : "text-gray-600";
  const borderColor = isDarkBackground ? "border-white" : "border-gray-600";
  const dotColor = isDarkBackground ? "bg-white" : "bg-gray-600";

  return (
    <AnimatePresence>
      {showScrollIndicator && (
        <motion.div
          ref={indicatorRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.5 }}
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
