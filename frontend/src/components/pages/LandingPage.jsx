import React from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../theme-provider";
import { useState, useEffect, useMemo } from "react";

// Components
import { motion, AnimatePresence } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { IconTypewriterEffect } from "@/components/ui/typewriter-effect";
import ThreeDText from "../3d-icon-text";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000); // 2s

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key={"intro"}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full flex items-center justify-center fixed top-0 left-0 z-50 bg-black"
          >
            <TextHoverEffect text="ICON" duration={0.5} />
          </motion.div>
        ) : (
          <motion.div
            key={"main-content"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="min-h-screen bg-neutral-950 overflow-hidden">
              {/* hero section */}
              <section className="relative h-screen grid grid-cols-1 lg:grid-cols-2 items-center pl-8 md:pl-16 lg:pl-24">
                <Boxes />
                <div className="flex flex-col items-start justify-center order-2 lg:order-1 pl-10">
                  <div className="text-left z-10 relative">
                    <IconTypewriterEffect className="mb-2" startDelayMs={400} />
                    <p className="text-neutral-300 mt-8 max-w-lg text-lg">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <div className="mt-20 flex flex-wrap items-center gap-5">
                      <Button asChild size="lg" className="px-6">
                        <a href="/signup">Register</a>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="px-6"
                      >
                        <a href="">Renewal</a>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="relative order-1 lg:order-2 z-10 flex items-center justify-center pr-8 lg:pr-24">
                  <ThreeDText
                    text="ICON"
                    className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight"
                    skewXDeg={-60}
                    skewYDeg={30}
                    rotateXDeg={45}
                    rotateYDeg={0}
                    rotateZDeg={-100}
                    color="#FBC748ff"
                  />
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
