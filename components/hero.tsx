"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Scene3D } from "./3d-scene";
import { useState, useEffect } from "react";

const roles = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      ease: "easeOut",
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    // FIX APPLIED HERE:
    // Added 'pt-24' for mobile to push content down below the navbar.
    // Added 'md:pt-0' to reset this on desktop where vertical centering works fine.
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      {/* --- BACKGROUND 3D SCENE --- */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* CONTENT CONTAINER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none pb-20">
        <motion.div
          className="grid lg:grid-cols-1 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8 text-center flex flex-col items-center">
            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-foreground/80">
                Available for Opportunities
              </span>
            </motion.div>

            <div className="space-y-4 w-full pointer-events-auto">
              {/* Name */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                variants={itemVariants}
              >
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Prasangeet
                </span>
              </motion.h1>

              {/* Roles Section - Stacked Layout */}
              <motion.div
                className="flex flex-col items-center justify-center gap-2"
                variants={itemVariants}
              >
                <span className="text-xl sm:text-2xl text-muted-foreground font-medium">
                  I am a
                </span>

                {/* Rotating Text Container */}
                <div className="relative h-12 sm:h-16 w-full flex justify-center overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute top-0 text-center whitespace-nowrap bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pb-2"
                    >
                      {roles[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.p
                className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-sm sm:max-w-xl mx-auto leading-relaxed pt-2"
                variants={itemVariants}
              >
                Crafting scalable solutions at the intersection of web
                development and AI. Creating impact through code, one commit at
                a time.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center pt-4 pointer-events-auto"
              variants={containerVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 group relative overflow-hidden"
                >
                  <a href="#projects">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View My Work
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 border-primary/20 hover:bg-primary/5 hover:border-primary/40 backdrop-blur-sm"
                >
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center pt-6 pointer-events-auto"
              variants={containerVariants}
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
                  className="p-3 rounded-xl border border-primary/10 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Moved to bottom-8 for better clearance */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground/50 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="relative h-10 w-6 rounded-full border border-muted-foreground/30 p-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-primary mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
