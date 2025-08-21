"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  stagger,
  useAnimate,
  useInView,
  AnimatePresence,
} from "motion/react";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-white",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-white",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const IconTypewriterEffect = ({ className, cursorClassName, startDelayMs = 400 }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showSplit, setShowSplit] = useState(false);
  const [topText, setTopText] = useState("I");
  const [bottomText, setBottomText] = useState("CON");

  useEffect(() => {
    const phases = [
      // type the ICON first
      () => {
        const text = "ICON";
        setDisplayText(text);
        // give time for slower per-letter animation to complete before split
        setTimeout(() => setCurrentPhase(1), 2000);
      },
      // split animation
      () => {
        setShowSplit(true);
        setTimeout(() => setCurrentPhase(2), 1000);
      },
      // type ntegrated affter i
      () => {
        const addition = "NTEGRATED";
        let i = 0;
        const interval = setInterval(() => {
          if (i <= addition.length) {
            setTopText("I" + addition.slice(0, i));
            i++;
          } else {
            clearInterval(interval);
            setTimeout(() => setCurrentPhase(3), 300);
          }
        }, 100);
      },
      // type federacy after con
      () => {
        const addition = "FEDERACY";
        let i = 0;
        const interval = setInterval(() => {
          if (i <= addition.length) {
            setBottomText("CON" + addition.slice(0, i));
            i++;
          } else {
            clearInterval(interval);
          }
        }, 100);
      },
    ];

    let startDelayTimeout;
    if (phases[currentPhase]) {
      if (currentPhase === 0 && startDelayMs > 0) {
        startDelayTimeout = setTimeout(() => {
          phases[currentPhase]();
        }, startDelayMs);
      } else {
        phases[currentPhase]();
      }
    }
    return () => {
      if (startDelayTimeout) clearTimeout(startDelayTimeout);
    };
  }, [currentPhase, startDelayMs]);

  return (
    <div className={cn("font-bold text-left leading-tight", className)}>
      <AnimatePresence mode="wait">
        {!showSplit ? (
          // single icon text
          <motion.div
            key="single"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl"
          >
            <span className="text-white">
              {displayText.split("").map((char, index) => (
                <motion.span
                  key={`icon-char-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.14, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className={cn(
                  "inline-block w-[4px] text-white",
                  cursorClassName
                )}
                style={{ height: "1em" }}
              />
            </span>
          </motion.div>
        ) : (
          // split
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-start justify-start space-y-0"
          >
            {/* I will go to top and CON will go to bottom */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl"
            >
              <span className="text-white">
                {topText}
                {currentPhase === 2 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className={cn(
                      "inline-block w-[3px] text-white",
                      cursorClassName
                    )}
                    style={{ height: "1em" }}
                  />
                )}
              </span>
            </motion.div>

            {/* now CON will become CONFEDERACY */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 6 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl"
            >
              <span className="text-white">
                {bottomText}
                {currentPhase === 3 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className={cn(
                      "inline-block w-[3px] text-white",
                      cursorClassName
                    )}
                    style={{ height: "1em" }}
                  />
                )}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
