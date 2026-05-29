"use client"

import { Button } from "@/components/ui/button"
import { Github, Folder, ExternalLink, ArrowUpRight } from "lucide-react"
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
  SiJavascript,
  SiFirebase,
  SiElectron,
  SiDigitalocean,
  SiWireguard,
  SiMaplibre,
  SiRedis,
  SiPytorch,
  SiJupyter,
  SiReactquery,
  SiCloudinary,
} from "react-icons/si"

// Helper to map tech names to icons
const getTechIcon = (techName: string) => {
  const normalize = (str: string) => str.toLowerCase().replace(/[\s\.]/g, "")

  const map: Record<string, React.ElementType> = {
    react: SiReact,
    "next.js": SiNextdotjs,
    tailwindcss: SiTailwindcss,
    "node.js": SiNodedotjs,
    "express.js": SiExpress,
    django: SiDjango,
    postgresql: SiPostgresql,
    mongodb: SiMongodb,
    python: SiPython,
    javascript: SiJavascript,
    firebase: SiFirebase,
    "electron.js": SiElectron,
    digitalocean: SiDigitalocean,
    wireguard: SiWireguard,
    "maplibre gl": SiMaplibre,
    redis: SiRedis,
    pytorch: SiPytorch,
    jupyter: SiJupyter,
    "react query": SiReactquery,
    cloudinary: SiCloudinary,
  }

  const key = Object.keys(map).find(k => normalize(techName).includes(normalize(k)))
  return key ? map[key] : null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Projects() {
  const projects = [
    {
      name: "SAM",
      description:
        "A modular local-first AI voice assistant featuring semantic memory, asynchronous cognition pipelines, autonomous tool execution, and a Qt-based desktop control center.",
      tech: [
        "Python",
        "Ollama",
        "LLaMA 3",
        "Faster-Whisper",
        "SQLite",
        "NetworkX",
        "Qt/PySide6"
      ],
      github: "https://github.com/prasangeet/Sam",
      status: "May 2026 - Present",
      featured: true,
    },
    {
      name: "CollabDocs",
      description:
        "Real-time collaborative editing platform supporting state synchronization and concurrent multi-user document updates with low broadcast latency.",
      tech: ["Next.js", "NestJS", "PostgreSQL", "Socket.IO", "Prisma"],
      github: "https://github.com/Mayu-infinite/collab-frontend.git",
      live: "https://collab-frontend-sigma.vercel.app/",
      status: "May 2026 - Present",
      featured: true,
    },
    {
      name: "NeutronVPN",
      description:
        "A secure, high-performance VPN solution with WireGuard encryption, Electron.js client for cross-platform control, and scalable DigitalOcean deployment.",
      tech: ["Django", "Electron.js", "PostgreSQL", "WireGuard", "DigitalOcean"],
      github: "https://github.com/prasangeet/NeutronVPN-linux",
      status: "Oct 2025 - Present",
      featured: true,
    },
    {
      name: "CSRconnect",
      description:
        "Platform connecting CSR initiatives with SDG-aligned academic research. Features PDF parsing, AI-based classification, and company mapping.",
      tech: ["Django", "Next.js", "PostgreSQL", "React", "TailwindCSS"],
      github: "https://github.com/prasangeet/CSRconnect",
      status: "Jan 2025 - Mar 2025",
    },
    {
      name: "Pathfinding Visualizer",
      description:
        "Interactive shortest path finder using Dijkstra's and A* algorithms on OpenStreetMap data with real-time visual feedback and optimized caching.",
      tech: ["Django", "PostgreSQL", "Redis", "Next.js", "MapLibre GL"],
      github: "https://github.com/prasangeet/Pathfinding-DSA-project",
      status: "Jan 2025 - Mar 2025",
    },
    {
      name: "Campus Connect",
      description:
        "Full-stack social platform with React Query state management, Firebase/JWT auth, and Cloudinary media handling.",
      tech: [
        "Next.js",
        "React Query",
        "TailwindCSS",
        "Django",
        "PostgreSQL",
        "Firebase",
        "Cloudinary"
      ],
      github: "https://github.com/prasangeet/Campus-Connect",
      status: "May 2025",
    },
  ]

  return (
    <section
      id="projects"
      className="border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden"
    >
      {/* Background Grid Pattern (Matches Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center gap-3">
              Featured Projects
              <span className="text-sm font-normal text-muted-foreground/50 border border-border/50 rounded-full px-3 py-1 hidden sm:block">
                {projects.length} Total
              </span>
            </h2>
            <motion.div className="h-1 w-12 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
          </motion.div>

          {/* Grid */}
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col justify-between rounded-xl border border-primary/20 bg-background/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
                variants={itemVariants}
              >
                {/* Gradient Glow Effect on Card Hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Card Header: Folder Icon & Links */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                      <Folder className="h-6 w-6" />
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label="GitHub Repo"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      {/* Optional: Add Live Demo Link here if available */}
                      {/* <ExternalLink className="h-5 w-5" /> */}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {project.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => {
                      const Icon = getTechIcon(tech)
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 rounded-md bg-secondary/50 border border-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"
                        >
                          {Icon && <Icon className="w-3 h-3 text-primary/70" />}
                          {tech}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Footer: Date & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                  <span className="text-xs font-mono text-muted-foreground">
                    {project.status.split(' - ')[0]}
                  </span>
                  <Button asChild variant="link" size="sm" className="p-0 h-auto text-primary hover:text-primary/80 group-hover:underline decoration-primary/50 underline-offset-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Code <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
