"use client";

import dynamic from "next/dynamic";

const SpaceBoiScene = dynamic(
  () => import("@/components/space-boi").then((mod) => mod.SpaceBoiScene),
  { ssr: false },
);

export function SpaceBoiBackground() {
  return (
    <div
      className="fixed inset-0 top-0 left-0 w-screen h-screen z-0 pointer-events-none overflow-hidden select-none bg-transparent"
      style={{
        transform: "none",
        willChange: "transform",
      }}
    >
      <SpaceBoiScene />
    </div>
  );
}
