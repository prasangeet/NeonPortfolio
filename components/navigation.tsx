"use client";

import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Mail,
  FileText,
} from "lucide-react";
import Dock from "./Dock";

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const dockItems = [
    {
      icon: <Home className="h-5 w-5 text-primary" />,
      label: "Prasangeet",
      onClick: () => scrollToSection("hero"),
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "About",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Experience",
      onClick: () => scrollToSection("experience"),
    },
    {
      icon: <FolderGit2 className="h-5 w-5" />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      label: "Skills",
      onClick: () => scrollToSection("skills"),
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "Resume",
      onClick: () =>
        window.open(
          "https://drive.google.com/file/d/1wksZ0nhH6sSytIQQZFpVKDIc0yzgCX7_/view?usp=sharing",
          "_blank",
          "noopener,noreferrer",
        ),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <Dock
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}
