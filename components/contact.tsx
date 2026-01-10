"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Copy,
  Check,
  MapPin,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "prasangeetdgr@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/prasangeet",
      icon: Github,
      color: "hover:bg-zinc-800 hover:text-white hover:border-zinc-700",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/prasangeetdongre01",
      icon: Linkedin,
      color: "hover:bg-blue-600 hover:text-white hover:border-blue-500",
    },
    {
      name: "Twitter / X",
      href: "https://x.com/prasangeetdgr",
      icon: Twitter,
      color: "hover:bg-black hover:text-white hover:border-zinc-800",
    },
  ];

  return (
    <section
      id="contact"
      // CHANGED: Added 'min-h-[80vh] flex flex-col justify-center' and increased py padding
      className="relative border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent py-32 sm:py-48 min-h-[80vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* --- Left Column: Context & Pitch --- */}
          <div className="space-y-8">
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for opportunities
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Let's build something <br />
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  amazing together.
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                I'm currently looking for new opportunities in Full Stack
                Development and AI. Whether you have a question, a project idea,
                or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Jodhpur, India (Open to Remote)</span>
              </div>
            </motion.div>
          </div>

          {/* --- Right Column: Interactive Cards --- */}
          <div className="space-y-6">
            {/* 1. Email Card (The Hero Action) */}
            <motion.div variants={itemVariants}>
              <div className="group rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-md shadow-lg transition-all hover:shadow-primary/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Email Me
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Best way to reach out
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="rounded-full hover:bg-primary/10"
                  >
                    <a href={`mailto:${email}`}>
                      <Send className="h-4 w-4 text-primary" />
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3 border border-border/50 group-hover:border-primary/30 transition-colors">
                  <span className="text-sm font-mono text-muted-foreground truncate mr-2">
                    {email}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1.5 text-xs font-medium hover:bg-background"
                    onClick={handleCopy}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-1.5 text-green-500"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* 2. Social Links Grid */}
            <motion.div
              variants={itemVariants}
              className="grid gap-4 sm:grid-cols-3"
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <social.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          className="mt-24 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
        >
          <p>© 2025 Prasangeet Dongre.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> using Next.js &
            Tailwind
          </p>
        </motion.div>
      </div>
    </section>
  );
}
