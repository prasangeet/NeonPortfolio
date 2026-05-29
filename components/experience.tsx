"use client"

import { motion } from "framer-motion"
import { Calendar, Building2, Briefcase, ChevronRight, Laptop } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    backgroundColor: "rgba(var(--primary-rgb), 0.03)",
    borderColor: "rgba(var(--primary-rgb), 0.4)",
    transition: { duration: 0.2 },
  },
}

export default function Experience() {
  const experiences = [
    {
      title: "Insurance Claim Risk Prediction",
      role: "Undergraduate Researcher",
      company: "IIT Jodhpur",
      type: "Research",
      period: "Aug 2024 - Nov 2024",
      description: "Developed an AI-driven solution to detect fraudulent insurance claims, focusing on reducing false positives in LLM outputs.",
      highlights: [
        "Built NLP-based fraud detection using RAG & LangChain",
        "Reduced hallucinations by 40% via domain-specific pipelines",
        "Mentored by Prof. Santhosh Varanasi (Chem. Engg.)",
      ],
      tech: ["Python", "RAG", "LangChain", "Google Gemini", "NLP"],
    },
    {
      title: "SDG Mapping Platform",
      role: "Full Stack Developer",
      company: "IIT Jodhpur",
      type: "Development",
      period: "Jan 2025 - Mar 2025",
      description: "Architected a full-stack platform to align Corporate Social Responsibility (CSR) initiatives with Sustainable Development Goals (SDGs).",
      highlights: [
        "Built scalable platform using Django, PostgreSQL & Next.js",
        "Integrated Gemini API for automated text classification",
        "Collaborated with School of Management & Entrepreneurship",
      ],
      tech: ["Next.js", "Django", "PostgreSQL", "React", "REST API"],
    },
    {
      title: "Multimodal Research Paper Database",
      role: "Research Intern",
      company: "IIT Hyderabad",
      type: "Research",
      period: "May 2026 - Present",
      description:
        "Building a multimodal research paper database by extracting textual, tabular, and visual information from scientific publications for retrieval-augmented generation (RAG) and question-answering systems.",
      highlights: [
        "Processed 100+ research papers into structured knowledge assets",
        "Implemented YOLO-based layout detection across 2,000+ document regions",
        "Integrated Gemma & Gemini to convert 1,000+ scientific figures into structured JSON",
      ],
      tech: [
        "Python",
        "YOLO",
        "Gemma",
        "Gemini",
        "PyMuPDF",
        "OpenCV",
        "RAG",
        "PySide6",
      ],
    },
  ]

  return (
    <section
      id="experience"
      className="border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="space-y-4" variants={cardVariants}>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Professional Experience
              </h2>
              <Briefcase className="w-8 h-8 text-primary/40 hidden sm:block" />
            </div>
            <motion.div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 sm:left-10 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/50 via-blue-500/30 to-transparent hidden sm:block" />

            <div className="space-y-12 sm:space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-12"
                  variants={cardVariants}
                >
                  {/* Timeline Node (Hidden on mobile) */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-background shadow-lg shadow-primary/10 z-10">
                      <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
                      {exp.type === "Research" ? (
                        <Laptop className="h-8 w-8 text-primary" />
                      ) : (
                        <Briefcase className="h-8 w-8 text-blue-500" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className="relative rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 backdrop-blur-sm transition-colors hover:border-primary/30 group"
                    whileHover="hover"
                  >
                    {/* Glowing effect behind card */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

                    {/* Header: Title & Role */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-medium text-primary/90">
                            <Briefcase className="w-4 h-4" />
                            {exp.role}
                          </span>
                          <span className="hidden sm:block text-border">•</span>
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      {/* Date Badge */}
                      <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    {/* Highlights List */}
                    <ul className="mb-6 space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90">
                          <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-primary/10 text-primary/80 border border-primary/10 group-hover:border-primary/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
