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
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

// hover effect card data
const hoverData = [
  {
    title: "Hackathon",
    description:
      "Collaborative coding competitions where students solve real-world problems, innovate, and showcase their technical skills.",
    link: "#hackathon",
    image: "src/assets/landing-page/Hackathon-1.png",
  },
  {
    title: "Workshop",
    description:
      "Hands-on learning sessions designed to build practical skills, share knowledge, and explore new technologies together.",
    link: "#workshop",
    image: "src/assets/landing-page/Workshop.png",
  },
  {
    title: "Networking",
    description:
      "A space to connect with fellow students, mentors, and the ICON community.",
    link: "#networking",
    image: "src/assets/landing-page/Networking.png",
  },
];

// bento grid components
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const bentoItems = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

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
            className="overflow-x-hidden"
          >
            <section className="min-h-screen relative bg-neutral-900">
              <BackgroundBeamsWithCollision className="absolute inset-0 bg-neutral-900 w-full"></BackgroundBeamsWithCollision>

              {/* nav */}
              <nav className="relative z-10 flex w-full items-center justify-between border-t border-b border-neutral-200/20 px-4 py-4 dark:border-neutral-800/20">
                <div className="flex items-center gap-2">
                  <div className="size-15 rounded-full border border-white/20 bg-white/10 p-2">
                    <img src="src/assets/landing-page/icon.png" alt="" />
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-24 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200 md:w-32"
                >
                  <a href="/login">Login</a>
                </Button>
              </nav>

              {/* hero content */}
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-10 md:py-20 relative">
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
                      className="w-60 transform rounded-lg bg-neutral-100 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200"
                    >
                      <a href="/signup">Register</a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-60 transform rounded-lg border border-gray-300 bg-transparent px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100/10"
                    >
                      <a href="/renewal">Renewal</a>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className="relative z-10 mt-50 rounded-3xl border border-black bg-neutral-100/5 p-4 shadow-md "
                  >
                    <div className="max-w-30xl mx-auto w-full overflow-hidden rounded-xl border border-gray-300/20 dark:border-gray-700/20 bg-white p-20 shadow-lg">
                      <div className="text-black">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4">
                          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                          INTEGRATED CONFEDERACY
                        </span>
                        <div className="mb-15 flex flex-col md:flex-row items-start justify-between md:gap-20">
                          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            What is ICON?
                          </h1>
                          <p className="sm:text-xs md:text-xl text-gray-600 max-w-lg leading-relaxed text-justify ">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nostrum dolores ullam enim inventore ratione
                            assumenda, provident laudantium nam deleniti quam
                            obcaecati totam doloremque omnis, eum praesentium.
                            Eos eius voluptatibus ex!
                          </p>
                        </div>

                        {/* divider */}
                        <div className="w-full h-px bg-gray-300 my-12"></div>

                        <div className="flex flex-row items-start justify-between gap-20">
                          <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                            Committees Under ICON
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-30 mt-10">
                          <div className="text-center">
                            <div className="w-25 h-25 mx-auto mb-4 rounded-full border-2 border-teal-500 flex items-center justify-center overflow-hidden">
                              <img
                                src="/src/assets/landing-page/SCOPE_color.png"
                                alt="SCOPE"
                                className="w-18 h-18 object-cover"
                              />
                            </div>
                            <LinkPreview
                              url={"https://www.facebook.com/sluSCOPEbyICON"}
                            >
                              <h3 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer">
                                SCOPE
                              </h3>
                            </LinkPreview>
                            <p className="text-gray-600 text-justify md:text-center">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. At, aspernatur accusamus. Perferendis, a
                              accusamus. Quae velit aspernatur illum quo
                              eligendi asperiores autem? Quidem eos, ipsa
                              accusantium debitis error illum ullam.
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="w-25 h-25 mx-auto mb-4 rounded-full border-2 border-teal-500 flex items-center justify-center overflow-hidden">
                              <img
                                src="/src/assets/landing-page/AIM_color.png"
                                alt="AIM"
                                className="w-20 h-20 object-cover"
                              />
                            </div>
                            <LinkPreview
                              url={
                                "https://www.facebook.com/profile.php?id=61567118691003"
                              }
                            >
                              <h3 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer">
                                AIM
                              </h3>
                            </LinkPreview>

                            <p className="text-gray-600 text-justify md:text-center">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. At, aspernatur accusamus. Perferendis, a
                              accusamus. Quae velit aspernatur illum quo
                              eligendi asperiores autem? Quidem eos, ipsa
                              accusantium debitis error illum ullam.
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
            <section className="relative bg-neutral-100 -mt-317 md:-mt-145 pt-350 md:pt-190 pb-20">
              <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="mb-16">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    What ICON offers to students like you?
                  </h2>
                </div>
                <div className="max-w-5xl mx-auto">
                  <HoverEffect items={hoverData} />
                </div>
              </div>
            </section>

            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
