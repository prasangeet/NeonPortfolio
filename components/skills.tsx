"use client"

import { motion } from "framer-motion"
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
} from "react-icons/si"
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
  Smartphone,
  Server,
  Layers,
  Wrench,
  BookOpen
} from "lucide-react"

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Skills() {
  const skillCategories = [
    // --- Tech Stack Group ---
    {
      category: "Languages",
      icon: Terminal,
      skills: [
        { name: "Python", icon: SiPython, color: "text-blue-500" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
        { name: "Java", icon: Coffee, color: "text-red-500" },
        { name: "C++", icon: SiCplusplus, color: "text-blue-600" },
        { name: "C", icon: SiC, color: "text-slate-400" },
      ],
    },
    {
      category: "Frontend",
      icon: Layers,
      skills: [
        { name: "React", icon: SiReact, color: "text-cyan-400" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
        { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
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
      category: "Mobile",
      icon: Smartphone,
      skills: [
        { name: "React Native", icon: SiReact, color: "text-cyan-400" },
        { name: "Kotlin", icon: SiKotlin, color: "text-purple-500" },
        { name: "Android Studio", icon: SiAndroidstudio, color: "text-green-400" },
      ],
    },
    {
      category: "Databases",
      icon: Database,
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "Prisma", icon: SiPrisma, color: "text-teal-300" },
      ],
    },
    {
      category: "DevOps & Tools",
      icon: Wrench,
      skills: [
        { name: "Git", icon: SiGit, color: "text-red-600" },
        { name: "GitHub", icon: SiGithub, color: "text-white" },
        { name: "Docker", icon: SiDocker, color: "text-blue-400" },
        { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      ],
    },
    {
      category: "AI & ML",
      icon: Brain,
      skills: [
        { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
        { name: "PyTorch", icon: SiPytorch, color: "text-red-500" },
        { name: "Colab", icon: SiGooglecolab, color: "text-yellow-500" },
      ],
    },
    
    // --- Academic & Theory Group (List Format) ---
    {
      category: "Course Studies",
      type: "list",
      icon: BookOpen,
      skills: [
        { name: "Data Structures & Algo", grade: "A*", icon: Binary, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { name: "Intro to ML", grade: "A", icon: Brain, color: "text-purple-400", bg: "bg-purple-400/10" },
      ],
    },
    {
      category: "Self Study",
      type: "list",
      icon: Cpu,
      skills: [
        { name: "Operating Systems", icon: Monitor, color: "text-cyan-300", bg: "bg-cyan-300/10" },
        { name: "Database Systems", icon: Database, color: "text-blue-300", bg: "bg-blue-300/10" },
        { name: "Computer Networks", icon: Network, color: "text-orange-300", bg: "bg-orange-300/10" },
      ],
    },
    {
      category: "Interests",
      type: "list",
      icon: Eye,
      skills: [
        { name: "NLP", icon: MessageSquare, color: "text-yellow-300", bg: "bg-yellow-300/10" },
        { name: "Computer Vision", icon: Eye, color: "text-cyan-300", bg: "bg-cyan-300/10" },
        { name: "Deep Learning", icon: BrainCircuit, color: "text-pink-400", bg: "bg-pink-400/10" },
      ],
    },
  ]

  return (
    <section
      id="skills"
      className="relative border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent min-h-screen overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="space-y-4" variants={cardVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center gap-3">
              Skills & Expertise
              <Code2 className="w-8 h-8 text-primary/40 hidden sm:block" />
            </h2>
            <motion.div className="h-1 w-12 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" variants={containerVariants}>
            {skillCategories.map((category, index) => {
              const CategoryIcon = category.icon
              const isList = category.type === "list"
              
              return (
                <motion.div
                  key={index}
                  className={`
                    group relative rounded-xl border border-primary/20 bg-background/40 backdrop-blur-md 
                    hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300
                    ${isList && index >= skillCategories.length - 3 ? "md:col-span-2 lg:col-span-1" : ""} 
                    /* Making list items span smartly if needed, or keep uniform */
                  `}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-foreground/90">{category.category}</h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {isList ? (
                      /* List Layout */
                      <div className="space-y-3">
                        {category.skills.map((skill, i) => {
                          const Icon = skill.icon
                          return (
                            <div key={i} className="flex items-center gap-3 group/item">
                              <div className={`p-1.5 rounded-md ${skill.bg || 'bg-primary/10'} ${skill.color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 flex justify-between items-center">
                                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                                  {skill.name}
                                </span>
                                {skill.grade && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    {skill.grade}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      /* Grid Layout (Tech Icons) */
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, i) => {
                          const Icon = skill.icon
                          return (
                            <div key={i} className="relative group/icon">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default">
                                <Icon className={`h-5 w-5 ${skill.color} transition-transform group-hover/icon:scale-110`} />
                              </div>
                              
                              {/* Animated Tooltip */}
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded text-[10px] font-medium text-popover-foreground opacity-0 group-hover/icon:opacity-100 transform scale-95 group-hover/icon:scale-100 transition-all shadow-xl whitespace-nowrap z-20 pointer-events-none">
                                {skill.name}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
