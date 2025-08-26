import React from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../theme-provider";
import { useState, useEffect, useMemo } from "react";

// Components
import { motion, AnimatePresence } from "motion/react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { BackToTop } from "@/components/back-to-top";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Footer } from "@/components/footer";
import {
  hoverData,
  words,
  tracingBeamContent,
} from "@/components/constants-data.jsx";

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
            className="overflow-x-hidden relative"
          >
            {/* background beams */}
            <div className="fixed inset-0 -z-10">
              <BackgroundBeamsWithCollision className="w-full h-full bg-neutral-900"></BackgroundBeamsWithCollision>
            </div>

            <section className="min-h-screen relative bg-transparent">
              {/* nav */}
              <nav className="relative z-10 flex w-full items-center justify-center border-t border-b border-neutral-200/20 px-4 py-4 dark:border-neutral-800/20">
                <div className="flex items-center gap-2">
                  <div className="size-25 rounded-full p-2">
                    <img src="/landing-page/icon.png" alt="" />
                  </div>
                </div>
              </nav>

              {/* hero content */}
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 pb-20 md:pb-30 p relative">
                <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/20 dark:bg-neutral-800/20">
                  <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/20 dark:bg-neutral-800/20">
                  <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/20 dark:bg-neutral-800/20">
                  <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </div>
                {/* hero content */}
                <div className="relative z-10 max-w-7xl mx-auto">
                  <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-300 md:text-4xl lg:text-7xl">
                    {"Integrated Confederacy".split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          ease: "easeInOut",
                        }}
                        className="mr-2 inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400"
                  >
                    Membership Drive
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="w-70 h-11 md:h-13 transform rounded-lg bg-[#FAC748ff] px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FAC748ff]/80"
                    >
                      <a href="/signup">Register</a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="w-70 h-11 md:h-13 transform rounded-lg bg-neutral-100 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100/80"
                    >
                      <a href="/renewal">Renewal</a>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className="relative z-10 mt-30 sm:mt-60 md:mt-40 xl:mt-59  rounded-3xl border border-black bg-[#363835] p-4 shadow-md  "
                  >
                    <div className="max-w-30xl mx-auto w-full overflow-hidden rounded-xl border border-gray-300/20 dark:border-gray-700/20 bg-[#EFF3EA] p-5 md:p-10 lg:pd-20 xl:pd-30 shadow-lg">
                      <div className="text-black">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs md-text-sm font-medium mb-4">
                          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                          INTEGRATED CONFEDERACY
                        </span>
                        <div className="mb-5 sm:mb-15 flex flex-col lg:flex-row items-start justify-between lg:gap-10">
                          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            What is ICON?
                          </h1>
                          <p className="text-sm sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-lg md:max-w-xl lg:max-w-2xl text-justify ">
                            The exclusive co-curricular organization for
                            Computing and Information Studies (CIS) students of
                            Saint Louis University, ICON (Integrated
                            Confederacy) serves as a dynamic platform for
                            encouraging collaboration, innovation, and community
                            engagement. Established with the vision of uniting
                            CIS students, ICON aims to enhance their academic
                            journey through a variety of initiatives, events,
                            and opportunities that promote personal and
                            professional growth.
                          </p>
                        </div>

                        {/* divider */}
                        <div className="w-full h-px bg-gray-400 my-12"></div>

                        <div className="flex flex-row items-start justify-between gap-20">
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                            Committees Under ICON
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2  mt-5 sm:mt-8 gap-5 sm:gap-5 md:gap-20">
                          <div className="text-center">
                            <div className="w-25 h-25 mx-auto mb-4 rounded-full border-2 border-teal-500 flex items-center justify-center overflow-hidden">
                              <img
                                src="/landing-page/SCOPE_color.png"
                                alt="SCOPE"
                                className="w-18 h-18 object-cover"
                              />
                            </div>
                            <LinkPreview
                              url={"https://www.facebook.com/sluSCOPEbyICON"}
                            >
                              <h3 className="sm:text-lg md:text-xl font-bold text-gray-900 mb-2 cursor-pointer">
                                SCOPE
                              </h3>
                            </LinkPreview>
                            <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600 text-justify">
                              SCoPE (Society of Computing and Pioneering
                              Exemplars) is a sub-organization of ICON. Focused
                              on nurturing talent and promoting innovation in IT
                              and Computer Science, it offers students
                              opportunities to collaborate on practical
                              projects, strengthen programming skills, and
                              develop analytical thinking through, fostering
                              future talent in the technical field.
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="w-25 h-25 mx-auto mb-4 rounded-full border-2 border-teal-500 flex items-center justify-center overflow-hidden">
                              <img
                                src="/landing-page/AIM_color.png"
                                alt="AIM"
                                className="w-20 h-20 object-cover"
                              />
                            </div>
                            <LinkPreview
                              url={
                                "https://www.facebook.com/profile.php?id=61567118691003"
                              }
                            >
                              <h3 className="sm:text-lg md:text-xl font-bold text-gray-900 mb-2 cursor-pointer">
                                AIM
                              </h3>
                            </LinkPreview>

                            <p className="text-xs sm:text-sm md:text-base lg:text-bases text-gray-600 text-justify">
                              AIM (Artist in Motion) is the exclusive
                              co-curricular organization for Multimedia Arts
                              students of Saint Louis University. As a
                              subsidiary of ICON, AIM provides a creative
                              platform to unleash talent and elevate artistic
                              skills through workshops, exhibits,
                              collaborations, and hands-on projects that
                              showcase the diverse fields of digital media,
                              design, and visual storytelling.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <ScrollIndicator />
              </div>
            </section>

            {/* section 2 */}
            <section className="relative bg-transparent -mt-193 sm:-mt-184 md:-mt-173 lg:-mt-150 xl:-mt-144 pb-10 pt-220 sm:pt-230 md:pt-220 lg:pt-150">
              <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="sm:mb-10 xl:mb-16">
                  <h2 className="text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white flex items-center justify-center">
                    What ICON offers to students like you?
                  </h2>
                </div>
                <div className="max-w-5xl mx-auto">
                  <HoverEffect items={hoverData} />
                </div>
              </div>
            </section>

            {/* section 3 */}
            <section className="relative bg-transparent pt-20 pb-20">
              <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="flex flex-col mb-16 justify-center items-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    <TypewriterEffectSmooth words={words} />
                  </h2>
                  <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl md:mb-5 lg:mb-10 ">
                    Explore our community from past events and activities
                  </p>
                </div>
                <div className="max-w-6xl mx-auto">
                  <TracingBeam className="px-6">
                    <div className="max-w-xl sm:max-w-2xl md:max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto antialiased pt-4 relative">
                      {tracingBeamContent.map((item, index) => (
                        <div
                          key={`content-${index}`}
                          className="mb-6 sm:mb-8 md:mb-4 lg:mb-10"
                        >
                          <h2 className="bg-white text-black rounded-full text-sm w-fit px-4 py-1 mb-2 sm:mb-3 md:mb-2 lg:mb-4">
                            {item.badge}
                          </h2>

                          <p className="text-lg sm:text-xl md:text-base lg:text-2xl xl:text-3xl mb-2 sm:mb-3 md:mb-2 lg:mb-4 font-bold text-white">
                            {item.title}
                          </p>

                          <div className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg prose prose-sm dark:prose-invert">
                            {item?.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                height="1000"
                                width="1000"
                                className="rounded-lg mb-6 sm:mb-8 md:mb-4 lg:mb-10 object-cover w-full h-60 sm:h-70 md:h-80 lg:h-96 xl:h-[41rem]"
                              />
                            )}
                            <div className="text-gray-300 leading-relaxed">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TracingBeam>
                </div>
              </div>
            </section>

            <Footer />

            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
