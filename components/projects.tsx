"use client";

import {
  Github,
  Folder,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import ShinyText from "@/components/ShinyText";
import SpecularButton from "@/components/SpecularButton";
import BorderGlow from "@/components/BorderGlow";
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
  SiRust,
  SiNeo4J,
  SiNestjs,
  SiSocketdotio,
  SiPrisma,
  SiDocker,
} from "react-icons/si";

// Helper to map tech names to icons
const getTechIcon = (techName: string) => {
  const normalize = (str: string) => str.toLowerCase().replace(/[\s\.]/g, "");

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
    rust: SiRust,
    neo4j: SiNeo4J,
    nestjs: SiNestjs,
    "socket.io": SiSocketdotio,
    prisma: SiPrisma,
    docker: SiDocker,
  };

  const key = Object.keys(map).find((k) =>
    normalize(techName).includes(normalize(k)),
  );
  return key ? map[key] : null;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Projects() {
  const projects = [
    {
      name: "ORION",
      description:
        "Local-first AI assistant featuring a high-performance Rust terminal client, modular Python runtime, IPC over Unix Domain Sockets, and an event-driven multi-agent system with LangGraph, Neo4j, and Qdrant.",
      tech: [
        "Rust",
        "Python",
        "LangGraph",
        "Neo4j",
        "Qdrant",
        "Textual",
        "Ratatui",
      ],
      github: "https://github.com/Limbo-corps/orion-cli",
      status: "May 2026 - Present",
      featured: true,
    },
    {
      name: "CollabDocs",
      description:
        "Real-time collaborative editing platform using Operational Transformation and Socket.IO, sustaining sub-50ms sync across 100+ concurrent users with optimized PostgreSQL pooling.",
      tech: ["Next.js", "NestJS", "PostgreSQL", "Socket.IO", "Prisma"],
      github: "https://github.com/Mayu-infinite/collab-frontend.git",
      live: "https://collab-frontend-sigma.vercel.app/",
      status: "Dec 2025 - Jan 2026",
      featured: true,
    },
    {
      name: "Campus Connect",
      description:
        "Campus collaboration platform with JWT auth, RBAC, live messaging, and event management exposing 25+ REST APIs. Configured Django Channels and Redis caching to offload 40% DB traffic.",
      tech: [
        "Next.js",
        "Django",
        "PostgreSQL",
        "Redis",
        "Django Channels",
        "Docker",
      ],
      github: "https://github.com/Limbo-corps/campus-connect",
      status: "Jun 2026 - Present",
      featured: true,
    },
    {
      name: "NeutronVPN",
      description:
        "A secure, high-performance VPN solution with WireGuard encryption, Electron.js client for cross-platform control, and scalable DigitalOcean deployment.",
      tech: [
        "Django",
        "Electron.js",
        "PostgreSQL",
        "WireGuard",
        "DigitalOcean",
      ],
      github: "https://github.com/prasangeet/NeutronVPN-linux",
      status: "Oct 2025 - Present",
    },
    {
      name: "CSRconnect",
      description:
        "Platform mapping 50+ research proposals to SDG-aligned CSR initiatives. Reduced classification time by 80% using Gemini semantic analysis and PostgreSQL full-text search.",
      tech: ["Django", "Next.js", "PostgreSQL", "React", "TailwindCSS"],
      github: "https://github.com/prasangeet/CSRconnect",
      status: "Jan 2025 - Mar 2025",
    },
    {
      name: "Pathfinding Visualizer",
      description:
        "Interactive shortest path finder using Dijkstra's and A* algorithms on OpenStreetMap data with real-time visual feedback and optimized Redis caching.",
      tech: ["Django", "PostgreSQL", "Redis", "Next.js", "MapLibre GL"],
      github: "https://github.com/prasangeet/Pathfinding-DSA-project",
      status: "Jan 2025 - Mar 2025",
    },
  ];

  return (
    <section
      id="projects"
      className="border-b border-border/50 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
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
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold sm:text-4xl text-[var(--foreground)] tracking-tight">
                Featured Projects
              </h2>
              <span className="text-xs font-mono text-[var(--muted-foreground)] border border-[var(--border)] rounded-full px-3 py-1 glass-effect hidden sm:inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[var(--primary)]" />
                {projects.length} Built
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl">
              <ShinyText
                text="A showcase of full-stack platforms, distributed systems, and AI tools I've engineered."
                disabled={false}
                speed={4}
              />
            </p>
            <motion.div className="h-1 w-12 bg-gradient-to-r from-[var(--primary)] to-blue-500 rounded-full" />
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="transition-transform duration-300 hover:-translate-y-1.5 h-full"
              >
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
                  <div className="group relative flex flex-col justify-between h-full p-6">
                    <div>
                      {/* Card Header: Folder Icon & Links */}
                      <div className="flex justify-between items-start mb-5">
                        <div className="rounded-xl bg-white/5 p-3 text-[var(--foreground)] ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                          <Folder className="h-5 w-5" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1.5 rounded-lg hover:bg-white/5"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1.5 rounded-lg hover:bg-white/5"
                            aria-label="GitHub Repo"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      {/* Title & Status */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-purple-400 transition-colors">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[var(--muted-foreground)] mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.map((tech, i) => {
                          const Icon = getTechIcon(tech);
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors group-hover:border-purple-500/30 group-hover:bg-purple-500/10"
                            >
                              {Icon && (
                                <Icon className="w-3 h-3 text-purple-300" />
                              )}
                              {tech}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Action Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                      <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                        {project.status.split(" - ")[0]}
                      </span>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <SpecularButton
                          size="sm"
                          radius={8}
                          tint="#ffffff"
                          tintOpacity={0.1}
                          blur={0}
                          textColor="var(--foreground)"
                          lineColor="var(--primary)"
                          baseColor="transparent"
                          intensity={0.8}
                          shineSize={10}
                          shineFade={30}
                          thickness={1}
                          speed={0.4}
                          followMouse
                          proximity={150}
                          autoAnimate={false}
                        >
                          <span className="flex items-center gap-1 font-mono text-xs px-1">
                            Code <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </SpecularButton>
                      </a>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
