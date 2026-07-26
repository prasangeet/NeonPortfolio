"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import ShinyText from "@/components/ShinyText";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiDocker,
  SiFirebase,
  SiTensorflow,
  SiPytorch,
  SiGooglecolab,
  SiPrisma,
  SiNestjs,
  SiKotlin,
  SiAndroidstudio,
  SiC,
  SiRust,
  SiGo,
  SiNeo4J,
  SiLangchain,
  SiScikitlearn,
  SiNumpy,
} from "react-icons/si";
import {
  Code2,
  Coffee,
  Binary,
  Brain,
  Cpu,
  Database,
  MessageSquare,
  Eye,
  BrainCircuit,
  Monitor,
  Network,
  Terminal,
  Server,
  Layers,
  Wrench,
  BookOpen,
  Sparkles,
} from "lucide-react";

// --- Types ---
interface TechSkill {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
}

interface ListSkill {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
  bg?: string;
  grade?: string;
}

interface TechCategory {
  category: string;
  type?: "grid";
  icon: LucideIcon;
  skills: TechSkill[];
}

interface ListCategory {
  category: string;
  type: "list";
  icon: LucideIcon;
  skills: ListSkill[];
}

type SkillCategory = TechCategory | ListCategory;

// --- Data Definitions ---
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    icon: Terminal,
    skills: [
      { name: "Python", icon: SiPython, color: "text-blue-500" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "Rust", icon: SiRust, color: "text-orange-500" },
      { name: "Go", icon: SiGo, color: "text-cyan-400" },
      { name: "C++", icon: SiCplusplus, color: "text-blue-600" },
      { name: "C", icon: SiC, color: "text-slate-400" },
      { name: "Java", icon: Coffee, color: "text-red-500" },
    ],
  },
  {
    category: "Frontend",
    icon: Layers,
    skills: [
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-400" },
      { name: "Express", icon: SiExpress, color: "text-gray-400" },
      { name: "NestJS", icon: SiNestjs, color: "text-red-500" },
      { name: "Django", icon: SiDjango, color: "text-green-600" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "PyTorch", icon: SiPytorch, color: "text-red-500" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
      { name: "LangChain / Graph", icon: SiLangchain, color: "text-teal-400" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "text-amber-400" },
      { name: "NumPy", icon: SiNumpy, color: "text-blue-400" },
      { name: "Colab", icon: SiGooglecolab, color: "text-yellow-500" },
    ],
  },
  {
    category: "Databases & Vector Stores",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "Prisma ORM", icon: SiPrisma, color: "text-teal-300" },
      { name: "Neo4j", icon: SiNeo4J, color: "text-blue-500" },
    ],
  },
  {
    category: "DevOps & Mobile",
    icon: Wrench,
    skills: [
      { name: "Docker", icon: SiDocker, color: "text-blue-400" },
      { name: "Git", icon: SiGit, color: "text-red-600" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      { name: "Kotlin", icon: SiKotlin, color: "text-purple-500" },
      {
        name: "Android Studio",
        icon: SiAndroidstudio,
        color: "text-green-400",
      },
    ],
  },
  {
    category: "Course Studies",
    type: "list",
    icon: BookOpen,
    skills: [
      {
        name: "Data Structures & Algorithms",
        grade: "Core",
        icon: Binary,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
      },
      {
        name: "Intro to Machine Learning",
        grade: "Core",
        icon: Brain,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
      },
      {
        name: "Probability & Stochastic Processes",
        grade: "Core",
        icon: BrainCircuit,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
      },
    ],
  },
  {
    category: "Systems & Theory",
    type: "list",
    icon: Cpu,
    skills: [
      {
        name: "Operating Systems",
        icon: Monitor,
        color: "text-cyan-300",
        bg: "bg-cyan-300/10",
      },
      {
        name: "Database Management Systems",
        icon: Database,
        color: "text-blue-300",
        bg: "bg-blue-300/10",
      },
      {
        name: "Computer Networks",
        icon: Network,
        color: "text-orange-300",
        bg: "bg-orange-300/10",
      },
    ],
  },
  {
    category: "AI & ML Specialization",
    type: "list",
    icon: Eye,
    skills: [
      {
        name: "Natural Language Understanding",
        icon: MessageSquare,
        color: "text-yellow-300",
        bg: "bg-yellow-300/10",
      },
      {
        name: "Computer Vision",
        icon: Eye,
        color: "text-cyan-300",
        bg: "bg-cyan-300/10",
      },
      {
        name: "Deep Learning Architectures",
        icon: BrainCircuit,
        color: "text-pink-400",
        bg: "bg-pink-400/10",
      },
    ],
  },
];

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  const [mousePos, setMousePos] = useState<
    Record<number, { x: number; y: number }>
  >({});

  const handleMouseMove = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="space-y-4" variants={cardVariants}>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold sm:text-4xl text-[var(--foreground)] tracking-tight flex items-center gap-3">
                Skills & Expertise
                <Code2 className="w-8 h-8 text-[var(--primary)]/40 hidden sm:block" />
              </h2>
              <span className="text-xs font-mono text-[var(--muted-foreground)] border border-[var(--border)] rounded-full px-3 py-1 glass-effect hidden sm:inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[var(--primary)]" />
                Chemical B.Tech + AI Minor
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl">
              <ShinyText
                text="A comprehensive breakdown of technical stacks, system fundamentals, and AI frameworks."
                disabled={false}
                speed={4}
              />
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-[var(--primary)] to-blue-500 rounded-full" />
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {SKILL_CATEGORIES.map((categoryItem, index) => {
              const CategoryIcon = categoryItem.icon;
              const isList = categoryItem.type === "list";
              const pos = mousePos[index] || { x: 0, y: 0 };

              return (
                <motion.div
                  key={categoryItem.category}
                  onMouseMove={(e) => handleMouseMove(index, e)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-background/40 backdrop-blur-md transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:-translate-y-1 overflow-hidden"
                  variants={cardVariants}
                >
                  {/* Spotlight Radial Effect */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                    style={{
                      background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                    }}
                  />

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="p-5 border-b border-[var(--border)]/50 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-[var(--foreground)] tracking-tight">
                        {categoryItem.category}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      {isList ? (
                        <div className="space-y-3">
                          {categoryItem.skills.map((skill) => {
                            const Icon = skill.icon;
                            return (
                              <div
                                key={skill.name}
                                className="flex items-center gap-3 group/item"
                              >
                                <div
                                  className={`p-1.5 rounded-lg ${
                                    skill.bg || "bg-[var(--primary)]/10"
                                  } ${skill.color}`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                  <span className="text-xs font-medium text-[var(--muted-foreground)] group-hover/item:text-[var(--foreground)] transition-colors">
                                    {skill.name}
                                  </span>
                                  {skill.grade && (
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                      {skill.grade}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2.5">
                          {categoryItem.skills.map((skill) => {
                            const Icon = skill.icon;
                            return (
                              <div
                                key={skill.name}
                                className="relative group/icon"
                              >
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/40 border border-secondary/60 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all duration-200 cursor-default">
                                  <Icon
                                    className={`h-5 w-5 ${skill.color} transition-transform group-hover/icon:scale-110`}
                                  />
                                </div>

                                <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[var(--popover)] border border-[var(--border)] rounded-md text-[10px] font-mono font-medium text-[var(--popover-foreground)] opacity-0 group-hover/icon:opacity-100 transform scale-95 group-hover/icon:scale-100 transition-all shadow-xl whitespace-nowrap z-30 pointer-events-none">
                                  {skill.name}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}