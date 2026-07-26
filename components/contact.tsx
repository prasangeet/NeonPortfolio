"use client";

import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  MapPin,
  Send,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";
import SpecularButton from "@/components/SpecularButton";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "prasangeetdongre1@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/prasangeet",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/prasangeetdongre01",
      icon: Linkedin,
    },
    {
      name: "X",
      href: "https://x.com/prasangeetdgr",
      icon: XIcon,
    },
  ];

  return (
    <section
      id="contact"
      className="relative border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent py-24 md:py-32 lg:py-48 min-h-[80vh] flex flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* --- Left Column: Context & Pitch --- */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for opportunities
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Let's build something <br />
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  amazing together.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                I'm currently looking for new opportunities in Full Stack
                Development and AI. Whether you have a question, a project idea,
                or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex items-center gap-2 text-muted-foreground pt-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Jodhpur, India (Open to Remote)</span>
              </div>
            </motion.div>
          </div>

          {/* --- Right Column: Interactive Cards --- */}
          <div className="space-y-6">
            {/* 1. Email Card (Hero Action) */}
            <motion.div variants={itemVariants}>
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
              >
                <div style={{ padding: "1.5rem" }} className="overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          Email Me
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Best way to reach out
                        </p>
                      </div>
                    </div>

                    <SpecularButton
                      size="lg"
                      radius={18}
                      tint="#ffffff"
                      tintOpacity={0}
                      blur={0}
                      textColor="#f5f5f5"
                      lineColor="#ffffff"
                      baseColor="#525252"
                      intensity={1}
                      shineSize={10}
                      shineFade={40}
                      thickness={1}
                      speed={0.35}
                      followMouse
                      proximity={250}
                      autoAnimate={false}
                      onClick={handleSendEmail}
                    >
                      <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                        Send <Send className="h-3.5 w-3.5" />
                      </span>
                    </SpecularButton>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3 border border-border/50 group-hover:border-primary/30 transition-colors gap-2">
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground truncate flex-1 min-w-0">
                      {email}
                    </span>

                    <SpecularButton
                      size="lg"
                      radius={12}
                      tint="#ffffff"
                      tintOpacity={0}
                      blur={0}
                      textColor="#f5f5f5"
                      lineColor="#ffffff"
                      baseColor="#333333"
                      intensity={1}
                      shineSize={8}
                      shineFade={40}
                      thickness={1}
                      speed={0.35}
                      followMouse
                      proximity={250}
                      autoAnimate={false}
                      onClick={handleCopy}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="flex items-center gap-1.5 text-green-400 text-xs"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Copied</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="flex items-center gap-1.5 text-xs"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Copy</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </SpecularButton>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>

            {/* 2. Social Links Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {socialLinks.map((social, idx) => (
                <div
                  key={idx}
                  className="w-full overflow-hidden rounded-[20px]"
                >
                  <SpecularButton
                    size="sm"
                    radius={20}
                    tint="#ffffff"
                    tintOpacity={0}
                    blur={0}
                    textColor="#f5f5f5"
                    lineColor="#ffffff"
                    baseColor="#120F17"
                    intensity={1}
                    shineSize={10}
                    shineFade={40}
                    thickness={1}
                    speed={0.35}
                    followMouse
                    proximity={250}
                    autoAnimate={false}
                    className="w-full h-full overflow-hidden"
                    onClick={() =>
                      window.open(social.href, "_blank", "noopener,noreferrer")
                    }
                  >
                    <div className="flex flex-col items-center justify-center gap-2 py-4 px-2 w-full overflow-hidden">
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-medium text-center truncate w-full">
                        {social.name}
                      </span>
                    </div>
                  </SpecularButton>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          className="mt-12 sm:mt-24 border-t border-border/40 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground text-center sm:text-left"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
        >
          <p>© 2026 Prasangeet Dongre.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> using Next.js &
            Tailwind
          </p>
        </motion.div>
      </div>
    </section>
  );
}
