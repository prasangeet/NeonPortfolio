"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      const isInteractive = target?.closest("a, button, [role='button']")
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-screen z-50"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Outer ring glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 border-2 border-cyan-400/50 rounded-full mix-blend-screen z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
          mass: 0.8,
        }}
      />

      {/* Trailing glow effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl mix-blend-screen z-40"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
          mass: 1.2,
        }}
      />
    </>
  )
}
