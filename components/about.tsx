"use client";

import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import MagicBento, { BentoCardItem } from "./MagicBento";
import { GitHubCalendar } from "react-github-calendar";
import {
  GraduationCap,
  Github,
  ExternalLink,
  Sparkles,
  Code2,
} from "lucide-react";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: [
      "rgba(255, 255, 255, 0.05)",
      "var(--sidebar-primary)",
      "oklch(0.65 0.2 260)",
      "oklch(0.75 0.15 250)",
      "var(--primary)",
    ],
    dark: [
      "rgba(255, 255, 255, 0.05)",
      "var(--sidebar-primary)",
      "oklch(0.65 0.2 260)",
      "oklch(0.75 0.15 250)",
      "var(--primary)",
    ],
  };

  const bentoCards: BentoCardItem[] = [
    // 1. Bio Overview (Top Row)
    {
      id: "about-me",
      colSpan: "col-span-12",
      children: (
        <div className="p-6 md:p-8 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Overview
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 gradient-text">
              Engineering Scalable Systems & Intelligent Apps
            </h2>

            <div className="space-y-3 text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed mt-4">
              <p>
                I'm a B.Tech student in{" "}
                <span className="text-[var(--foreground)] font-semibold">
                  Chemical Engineering
                </span>{" "}
                with a minor in{" "}
                <span className="text-[var(--foreground)] font-semibold">
                  Artificial Intelligence
                </span>{" "}
                at IIT Jodhpur.
              </p>
              <p>
                My core strength lies at the intersection of full-stack
                engineering and machine learning. I focus heavily on{" "}
                <span className="text-[var(--foreground)] font-medium">
                  DSA and System Architecture
                </span>{" "}
                to design robust, production-ready software.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // 2. Education Card (Middle Left)
    {
      id: "education",
      colSpan: "col-span-12 sm:col-span-6",
      children: (
        <div className="p-6 flex flex-col justify-between h-full min-h-[180px]">
          <div>
            <div className="rounded-[var(--radius)] bg-[var(--secondary)] p-2.5 w-fit text-[var(--foreground)] subtle-border mb-3">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-[var(--foreground)]">
              IIT Jodhpur
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] font-medium mt-0.5">
              B.Tech Chemical Eng. + AI Minor
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              CGPA
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--secondary)] border border-[var(--border)] px-2.5 py-0.5 text-xs font-semibold text-[var(--foreground)]">
              8.66
            </span>
          </div>
        </div>
      ),
    },

    // 3. IIT Hyderabad Internship Spotlight (Middle Right)
    {
      id: "iit-hyderabad-internship",
      colSpan: "col-span-12 sm:col-span-6",
      children: (
        <div className="p-6 flex flex-col justify-between h-full min-h-[180px]">
          <div>
            <div className="rounded-[var(--radius)] bg-[var(--secondary)] p-2.5 w-fit text-[var(--foreground)] subtle-border mb-3">
              <Code2 className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="font-bold text-lg text-[var(--foreground)]">
              IIT Hyderabad
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] font-medium mt-0.5">
              Research Intern
            </p>
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
            Building multimodal research-paper pipelines for RAG and QA systems.
          </p>
        </div>
      ),
    },

    // 4. GitHub Heatmap Card (Full Width Bottom)
    // GitHub Heatmap Card (Full Width Bottom)
    {
      id: "github-calendar",
      colSpan: "col-span-12",
      children: (
        <div className="p-4 md:p-5 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
              <Github className="h-4 w-4" />
              Contributions
            </div>
            <a
              href="https://github.com/prasangeet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] smooth-transition flex items-center gap-1"
            >
              prasangeet <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="w-full flex justify-center items-center py-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {mounted ? (
              <GitHubCalendar
                username="prasangeet"
                theme={theme}
                fontSize={11}
                blockSize={8}
                blockMargin={3}
                blockRadius={2}
              />
            ) : (
              <div className="h-[110px] w-full animate-pulse bg-[var(--muted)]/20 rounded-[var(--radius)]" />
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full h-full">
        {/* Left Side: Profile Card stretched container */}
        <div className="lg:col-span-4 flex justify-center items-center w-full h-full">
          <ProfileCard
            name="Prasangeet Dongre"
            title="Software Engineer & AI Minor"
            handle="prasangeet"
            status="Online"
            contactText="Contact Me"
            avatarUrl="https://avatars.githubusercontent.com/u/142200325?v=4"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            iconUrl="/placeholder-logo.png"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>

        {/* Right Side: Magic Bento spanning full container height */}
        <div className="lg:col-span-8 w-full flex flex-col justify-center">
          <MagicBento
            cards={bentoCards}
            glowColor="255, 255, 255"
            enableSpotlight={true}
            enableStars={false}
            clickEffect={false}
            enableTilt={false}
          />
        </div>
      </div>
    </section>
  );
}
