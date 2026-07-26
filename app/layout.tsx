import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ScrollStarsBackground } from "@/components/scroll-stars-background";
import { Scene3D } from "@/components/3d-scene";
import Navigation from "@/components/navigation";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prasangeet Dongre | Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Prasangeet Dongre - Full-stack developer, machine learning enthusiast, and open-source contributor at IIT Jodhpur.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground w-full">
        <ScrollStarsBackground />
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <Scene3D />
        </div>
        <div className="relative z-10">
          <Navigation />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
