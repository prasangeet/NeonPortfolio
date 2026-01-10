"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ScrollStarsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef({ y: 0 })
  const scrollVelocity = useRef(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    // --- Setup ---
    const scene = new THREE.Scene()
    // Removed scene.background = null as WebGLRenderer alpha:true handles this better

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 400 // Moved back slightly to see more constellations

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Cap pixel ratio for performance
    // renderer.setClearColor(0x000000, 0) // Not strictly necessary with alpha:true but good practice

    const canvas = renderer.domElement
    canvas.className = "fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    containerRef.current.appendChild(canvas)

    // --- Create Celestial Group ---
    // This group will hold both stars and lines so they rotate together
    const celestialGroup = new THREE.Group()
    scene.add(celestialGroup)

    // --- Stars Data ---
    const starsCount = 800 // Slightly reduced count to make constellations clearer
    const spread = 2000 // How far stars spread out
    const starPositions = new Float32Array(starsCount * 3)
    const starColors = new Float32Array(starsCount * 3)
    const starSizes = new Float32Array(starsCount)

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3
      starPositions[i3] = (Math.random() - 0.5) * spread
      starPositions[i3 + 1] = (Math.random() - 0.5) * spread
      starPositions[i3 + 2] = (Math.random() - 0.5) * spread

      // Neon colors
      const colorChoice = Math.random()
      if (colorChoice < 0.25) {
        // Cyan
        starColors[i3] = 0; starColors[i3 + 1] = 0.9; starColors[i3 + 2] = 1
      } else if (colorChoice < 0.5) {
        // Purple/Pink
        starColors[i3] = 1; starColors[i3 + 1] = 0; starColors[i3 + 2] = 0.8
      } else if (colorChoice < 0.75) {
        // Blue
        starColors[i3] = 0; starColors[i3 + 1] = 0.6; starColors[i3 + 2] = 1
      } else {
        // Magenta
        starColors[i3] = 0.7; starColors[i3 + 1] = 0; starColors[i3 + 2] = 1
      }

      starSizes[i] = Math.random() * 3 + 1 // Slightly smaller sizes
    }


    // --- Constellations Logic ---
    // We find stars that are close to each other and draw lines between them.
    const linePositions: number[] = []
    const connectionDistance = spread / 12 // Threshold distance to connect two stars. Tune this.
    const maxConnectionsPerStar = 3 // Limit connections to prevent cluttered hubs

    // Temporary vectors for calculation
    const v1 = new THREE.Vector3()
    const v2 = new THREE.Vector3()

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3
      v1.set(starPositions[i3], starPositions[i3 + 1], starPositions[i3 + 2])
      let connections = 0

      // Inner loop: compare star 'i' with subsequent stars 'j'
      for (let j = i + 1; j < starsCount; j++) {
        const j3 = j * 3
        v2.set(starPositions[j3], starPositions[j3 + 1], starPositions[j3 + 2])
        const dist = v1.distanceTo(v2)

        if (dist < connectionDistance) {
          // Add start point (star i)
          linePositions.push(v1.x, v1.y, v1.z)
          // Add end point (star j)
          linePositions.push(v2.x, v2.y, v2.z)
          
          connections++
          // Optimization: Stop connecting this star if it has enough neighbors
          if (connections >= maxConnectionsPerStar) break 
        }
      }
    }

    // --- Build Geometry & Materials ---

    // 1. Stars Point Cloud
    const starsGeometry = new THREE.BufferGeometry()
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))

    const starMaterial = new THREE.PointsMaterial({
      size: 4, // Base size, adjusted by 'size' attribute in shader
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      fog: false,
      blending: THREE.AdditiveBlending, // Makes overlapping stars brighter
      depthWrite: false, // Helpful for transparent particles
    })

    const stars = new THREE.Points(starsGeometry, starMaterial)
    celestialGroup.add(stars)

    // 2. Constellation Lines
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xaaddff, // A faint cyan/white color
        transparent: true,
        opacity: 0.12, // Very faint so they don't dominate
        blending: THREE.AdditiveBlending, // Makes them look like light rays
        depthWrite: false,
    })

    // Use LineSegments because we have many disconnected pairs
    const constellations = new THREE.LineSegments(linesGeometry, lineMaterial)
    celestialGroup.add(constellations)


    // --- Animation loop ---
    let animationId: number
    const clock = new THREE.Clock()

    const BASE_ROTATION_SPEED = {
      x: 0.015, // Slightly slower base speed looks better with lines
      y: 0.02,
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const delta = clock.getDelta() 

      const scrollBoost = scrollVelocity.current * 0.00002

      // Rotate the entire group
      celestialGroup.rotation.x += (BASE_ROTATION_SPEED.x + scrollBoost) * delta
      celestialGroup.rotation.y += (BASE_ROTATION_SPEED.y + scrollBoost) * delta

      // Smooth decay
      scrollVelocity.current *= 0.9

      renderer.render(scene, camera)
    }
    animate()

    // --- Event Handlers ---
    const handleScroll = () => {
      const currentY = window.scrollY
      scrollVelocity.current = currentY - lastScrollY.current
      lastScrollY.current = currentY
    }

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    // --- Cleanup ---
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      
      // Dispose all geometries and materials
      starsGeometry.dispose()
      starMaterial.dispose()
      linesGeometry.dispose()
      lineMaterial.dispose()

      if (containerRef.current?.contains(canvas)) {
        containerRef.current.removeChild(canvas)
      }
    }
  }, [])

  // Removed the div wrapper since we are appending the canvas directly and styling it in JS
  return <div ref={containerRef} />
}
