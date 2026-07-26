"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Scene3D } from "./3d-scene";
import { useState, useEffect } from "react";
import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import TrueFocus from "@/components/TrueFocus";
import SpecularButton from "@/components/SpecularButton";

const roles = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden pt-16 pb-6 px-4 md:px-8">
      {/* --- 3D BACKGROUND CANVAS --- */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* --- SMOOTH CIRCULAR CENTER BACKDROP --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] aspect-square rounded-full bg-[var(--background)]/60 blur-3xl pointer-events-none z-0" />

      {/* --- MAIN CENTER CONTENT --- */}
      <div className="my-auto w-full max-w-4xl relative z-10 pointer-events-none flex flex-col items-center text-center">
        <motion.div
          className="w-full flex flex-col items-center space-y-4 md:space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-effect shadow-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
            </span>
            <ShinyText
              text="Available for Opportunities"
              disabled={false}
              speed={3}
              className="text-xs font-medium text-[var(--foreground)]"
            />
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
          </motion.div>

          {/* Heading */}
          <div className="space-y-2 w-full pointer-events-auto">
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-[var(--foreground)]">
                <SplitText
                  text="Hi, I'm"
                  className="inline-block text-[var(--foreground)] mr-2"
                  delay={40}
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h1>

              <div className="pt-1 flex justify-center scale-90 sm:scale-100">
                <TrueFocus
                  sentence="Prasangeet"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="oklch(0.922 0.005 325.62)"
                  glowColor="rgba(235, 235, 235, 0.2)"
                  animationDuration={0.5}
                  pauseBetweenAnimations={1}
                />
              </div>
            </motion.div>

            {/* Dynamic Rotating Role */}
            <motion.div
              className="flex flex-col items-center justify-center pt-1"
              variants={itemVariants}
            >
              <span className="text-sm sm:text-lg text-[var(--muted-foreground)] font-medium">
                I specialize in
              </span>

              <div className="relative h-8 sm:h-10 w-full flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute gradient-text text-lg sm:text-2xl md:text-3xl font-extrabold whitespace-nowrap"
                  >
                    {roles[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              className="text-[var(--muted-foreground)] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed pt-1"
              variants={itemVariants}
            >
              Building intelligent, full-stack web platforms and interactive
              digital experiences with modern architecture and AI integrations.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center pointer-events-auto pt-1"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <a href="#projects" className="inline-block w-full sm:w-auto">
                <SpecularButton
                  size="lg"
                  radius={10}
                  tint="#ffffff"
                  tintOpacity={0.15}
                  blur={0}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  baseColor="#121215"
                  intensity={1.1}
                  shineSize={12}
                  shineFade={35}
                  thickness={1}
                  speed={0.4}
                  followMouse
                  proximity={250}
                  autoAnimate={false}
                >
                  <span className="flex items-center gap-2 font-semibold px-2 text-sm">
                    Explore My Work
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </SpecularButton>
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-11 px-6 glass-effect text-[var(--foreground)] hover:bg-[var(--accent)] rounded-xl smooth-transition text-sm"
              >
                <a href="#contact">Let's Connect</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-2.5 justify-center pointer-events-auto pt-1"
            variants={itemVariants}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/prasangeet",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/prasangeetdongre01",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:prasangeetdongre1@gmail.com",
                label: "Email",
              },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl glass-effect text-[var(--muted-foreground)] hover:text-[var(--foreground)] smooth-transition shadow-md"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
