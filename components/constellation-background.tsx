"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ConstellationBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a1a)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x0a0a1a, 0.1)
    containerRef.current.appendChild(renderer.domElement)

    // Create stars for constellation
    const starsCount = 400
    const starsGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starsCount * 3)
    const starColors = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 2000
      starPositions[i + 1] = (Math.random() - 0.5) * 2000
      starPositions[i + 2] = (Math.random() - 0.5) * 2000

      // Neon colors: cyan, fuchsia, electric blue, purple
      const colorChoice = Math.random()
      if (colorChoice < 0.25) {
        // Cyan
        starColors[i] = 0
        starColors[i + 1] = 1
        starColors[i + 2] = 1
      } else if (colorChoice < 0.5) {
        // Fuchsia
        starColors[i] = 1
        starColors[i + 1] = 0.1
        starColors[i + 2] = 0.9
      } else if (colorChoice < 0.75) {
        // Electric Blue
        starColors[i] = 0
        starColors[i + 1] = 0.5
        starColors[i + 2] = 1
      } else {
        // Purple
        starColors[i] = 0.8
        starColors[i + 1] = 0
        starColors[i + 2] = 1
      }
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 3,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    const stars = new THREE.Points(starsGeometry, starMaterial)
    scene.add(stars)

    // Create constellation lines
    const linesGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []

    for (let i = 0; i < starsCount - 1; i++) {
      if (Math.random() < 0.15) {
        linePositions.push(
          starPositions[i * 3],
          starPositions[i * 3 + 1],
          starPositions[i * 3 + 2],
          starPositions[(i + 1) * 3],
          starPositions[(i + 1) * 3 + 1],
          starPositions[(i + 1) * 3 + 2],
        )
      }
    }

    if (linePositions.length > 0) {
      linesGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3))

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.15,
        linewidth: 1,
      })

      const lines = new THREE.LineSegments(linesGeometry, lineMaterial)
      scene.add(lines)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      stars.rotation.x += 0.00005
      stars.rotation.y += 0.0001

      // Pulsing stars effect
      const starPositionsArray = starsGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < starsCount; i++) {
        const index = i * 3
        starPositionsArray[index] += Math.sin(Date.now() * 0.0001 + i) * 0.01
        starPositionsArray[index + 1] += Math.cos(Date.now() * 0.00008 + i) * 0.01
      }
      starsGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
