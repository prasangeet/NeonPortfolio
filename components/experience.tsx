"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, Building2, Briefcase, Laptop, Sparkles } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

interface ExperienceItem {
  title: string;
  role: string;
  company: string;
  type: "Research" | "Development";
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Multimodal Research Paper Database",
      role: "Research Intern",
      company: "IIT Hyderabad",
      type: "Research",
      period: "May 2026 - Jul 2026",
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
    {
      title: "SDG Mapping Platform",
      role: "Full Stack Developer",
      company: "IIT Jodhpur",
      type: "Development",
      period: "Jan 2025 - Mar 2025",
      description:
        "Architected a full-stack platform to align Corporate Social Responsibility (CSR) initiatives with Sustainable Development Goals (SDGs).",
      highlights: [
        "Built scalable platform using Django, PostgreSQL & Next.js",
        "Integrated Gemini API for automated text classification",
        "Collaborated with School of Management & Entrepreneurship",
      ],
      tech: ["Next.js", "Django", "PostgreSQL", "React", "REST API"],
    },
    {
      title: "Insurance Claim Risk Prediction",
      role: "Undergraduate Researcher",
      company: "IIT Jodhpur",
      type: "Research",
      period: "Aug 2024 - Nov 2024",
      description:
        "Developed an AI-driven solution to detect fraudulent insurance claims, focusing on reducing false positives in LLM outputs.",
      highlights: [
        "Built NLP-based fraud detection using RAG & LangChain",
        "Reduced hallucinations by 40% via domain-specific pipelines",
        "Mentored by Prof. Santhosh Varanasi (Chem. Engg.)",
      ],
      tech: ["Python", "RAG", "LangChain", "Google Gemini", "NLP"],
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 md:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      <motion.div
        className="space-y-12 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="space-y-3" variants={cardVariants}>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            Career Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Experience & Research
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[var(--primary)] to-blue-500 rounded-full" />
        </motion.div>

        {/* Timeline Body */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[var(--primary)]/40 via-[var(--border)] to-transparent hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 items-start"
                variants={cardVariants}
              >
                {/* Timeline Icon Node */}
                <div className="hidden sm:flex flex-col items-center pt-2">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-md z-10 text-[var(--primary)] transition-transform duration-300 hover:scale-110">
                    {exp.type === "Research" ? (
                      <Laptop className="h-5 w-5" />
                    ) : (
                      <Briefcase className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {/* BorderGlow with Card Content directly inside */}
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
                  <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[var(--foreground)] transition-colors duration-200">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted-foreground)] font-medium">
                          <span className="flex items-center gap-1.5 text-[var(--foreground)] font-semibold">
                            <Briefcase className="w-3.5 h-3.5 text-[var(--primary)]" />
                            {exp.role}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-start rounded-full border border-[var(--border)] bg-[var(--secondary)]/60 px-3 py-1 text-xs font-semibold text-[var(--foreground)] shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
                        {exp.period}
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {exp.description}
                    </p>

                    <ul className="mb-6 space-y-2.5">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--muted-foreground)]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
