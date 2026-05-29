"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Terminal,
  ArrowUpRight,
  Github,
  ExternalLink,
} from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useState, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      bounce: 0.4,
    },
  },
  float: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: [
      "rgba(255, 255, 255, 0.05)",
      "#0e7490",
      "#06b6d4",
      "#22d3ee",
      "#67e8f9",
    ],
    dark: [
      "rgba(255, 255, 255, 0.05)",
      "#0e7490",
      "#06b6d4",
      "#22d3ee",
      "#67e8f9",
    ],
  };

  return (
    <section
      id="about"
      className="border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden w-full max-w-[100vw]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-24 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* --- Left Column: Image & Heatmap --- */}
          <motion.div
            className="relative flex flex-col gap-10 lg:gap-8 items-center lg:items-start"
            variants={containerVariants}
          >
            <div className="absolute top-0 left-0 -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" />

            {/* Profile Image Wrapper */}
            <motion.div
              className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto lg:mx-0"
              variants={imageVariants}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary via-blue-500 to-purple-500 p-1"
                animate="float"
                variants={imageVariants}
              >
                <div className="h-full w-full overflow-hidden rounded-xl bg-background">
                  <img
                    src="https://avatars.githubusercontent.com/u/142200325?v=4"
                    alt="Prasangeet Dongre"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </motion.div>

              {/* Floating Card Position: Centered bottom on mobile, Right side on Desktop */}
              <motion.div
                className="absolute 
                           -bottom-12 left-1/2 -translate-x-1/2 
                           sm:-bottom-6 sm:left-auto sm:right-[-24px] sm:translate-x-0
                           w-max z-20
                           rounded-xl border border-border/50 bg-background/80 p-3 sm:p-4 backdrop-blur-md shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <Terminal className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                      Coding Streak
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      Active Contributor
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* GitHub Heatmap Section - HIDDEN ON MOBILE (hidden sm:block) */}
            <motion.div
              variants={itemVariants}
              className="hidden sm:block w-full max-w-[100vw] sm:max-w-full overflow-hidden mt-6 lg:mt-0"
            >
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Github className="h-4 w-4" />
                    GitHub Contributions
                  </div>
                  <a
                    href="https://github.com/prasangeet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View Profile <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="relative w-full">
                  <div className="flex overflow-x-auto pb-2 w-full touch-pan-x">
                    <div className="min-w-fit mx-auto lg:mx-0">
                      {mounted && GitHubCalendar ? (
                        <GitHubCalendar
                          username="prasangeet"
                          theme={theme}
                          fontSize={12}
                          blockSize={7}
                          blockMargin={2}
                          blockRadius={1}
                        />
                      ) : (
                        <div className="h-[120px] w-full animate-pulse bg-muted/10 rounded-lg" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Text Content --- */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
          >
            <motion.div
              className="space-y-3 sm:space-y-4 text-center lg:text-left"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                About Me
              </h2>
              <motion.div className="h-1 w-12 bg-gradient-to-r from-primary to-blue-500 mx-auto lg:mx-0" />
            </motion.div>

            <motion.div
              className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg text-center lg:text-left"
              variants={itemVariants}
            >
              <p>
                I'm a B.Tech student in{" "}
                <span className="text-foreground font-semibold">
                  Chemical Engineering
                </span>{" "}
                with a minor in{" "}
                <span className="text-primary font-semibold">
                  Artificial Intelligence
                </span>{" "}
                at IIT Jodhpur.
              </p>
              <p>
                My passion lies at the intersection of full-stack development
                and machine learning. With a strong foundation in{" "}
                <span className="text-foreground">DSA and System Design</span>,
                I excel at building scalable applications that solve real-world
                problems.
              </p>
              <p>
                Currently serving as a Core Member of{" "}
                <span className="text-blue-400 font-semibold">DevlUp Labs</span>
                , IIT Jodhpur's open-source community, where I contribute to
                innovative projects and mentor fellow developers.
              </p>
            </motion.div>

            {/* Info Cards Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-1">
              <motion.div
                className="group rounded-xl border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors"
                variants={itemVariants}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-primary/20 p-2 text-primary shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Education</h3>
                    <p className="text-sm text-muted-foreground">IIT Jodhpur</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Chemical Eng. + AI Minor
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      CGPA: 8.66
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* <motion.div */}
              {/*   className="group rounded-xl border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors" */}
              {/*   variants={itemVariants} */}
              {/* > */}
              {/*   <div className="flex items-start gap-3"> */}
              {/*     <div className="mt-1 rounded-lg bg-yellow-500/20 p-2 text-yellow-500 shrink-0"> */}
              {/*       <Award className="h-5 w-5" /> */}
              {/*     </div> */}
              {/*     <div> */}
              {/*       <h3 className="font-semibold text-foreground"> */}
              {/*         Achievements */}
              {/*       </h3> */}
              {/*       <ul className="mt-1 space-y-1 text-xs text-muted-foreground"> */}
              {/*         <li className="flex items-center gap-1"> */}
              {/*           <ArrowUpRight className="h-3 w-3 text-green-500 shrink-0" /> */}
              {/*           A* Grade in DSA */}
              {/*         </li> */}
              {/*         <li className="flex items-center gap-1"> */}
              {/*           <ArrowUpRight className="h-3 w-3 text-green-500 shrink-0" /> */}
              {/*           Open Source contributor GSSoC'26 */}
              {/*         </li> */}
              {/*       </ul> */}
              {/*     </div> */}
              {/*   </div> */}
              {/* </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
