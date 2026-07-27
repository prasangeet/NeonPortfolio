"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function smoothstep(t: number) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

function SpaceBoiModel({
  targetPresence,
  scrollSpeed,
}: {
  targetPresence: React.MutableRefObject<number>;
  scrollSpeed: React.MutableRefObject<number>;
}) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const currentPresence = useRef(0);
  const { scene } = useGLTF("/space_boi.glb");

  // Interpolated mouse tilt
  const mouseTilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.frustumCulled = false;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    // 1. Presence easing
    currentPresence.current +=
      (targetPresence.current - currentPresence.current) * 0.04;
    const factor = currentPresence.current;

    // 2. MOUSE TILT (Applied to Outer Group)
    if (outerGroupRef.current) {
      // Convert state.pointer (-1 to 1) to tilt target angles in radians
      const targetTiltY = state.pointer.x * 0.5; // Look left/right
      const targetTiltX = -state.pointer.y * 0.35; // Look up/down

      // Smooth interpolation (lerp)
      mouseTilt.current.x += (targetTiltX - mouseTilt.current.x) * 0.08;
      mouseTilt.current.y += (targetTiltY - mouseTilt.current.y) * 0.08;

      // Pitch & Yaw on the outer frame
      outerGroupRef.current.rotation.x = mouseTilt.current.x;
      outerGroupRef.current.rotation.y = mouseTilt.current.y;
      outerGroupRef.current.rotation.z = -mouseTilt.current.y * 0.15; // Subtle natural bank

      // Position Y & Scale
      const startY = -9.0;
      const targetY = -1.8;
      outerGroupRef.current.position.y = THREE.MathUtils.lerp(
        startY,
        targetY,
        factor,
      );

      const baseScale = 0.85 * factor;
      outerGroupRef.current.scale.setScalar(baseScale);
    }

    // 3. CONTINUOUS SPIN & SCROLL BOOST (Applied to Inner Group)
    if (innerGroupRef.current) {
      const baseRotationSpeed = 0.3;
      const scrollBoost = Math.min(Math.abs(scrollSpeed.current) * 0.03, 2.0);

      innerGroupRef.current.rotation.y +=
        delta * (baseRotationSpeed + scrollBoost);
    }

    // 4. MESH OPACITY FADE
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.transparent = true;
          mat.opacity = factor;
        }
      }
    });
  });

  return (
    <group ref={outerGroupRef} dispose={null}>
      <group ref={innerGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload("/space_boi.glb");

export function SpaceBoiScene() {
  const targetPresence = useRef(0);
  const scrollSpeed = useRef(0);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;
      scrollSpeed.current = deltaY;
      lastScrollY.current = currentY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        scrollSpeed.current = 0;
      }, 50);

      const el = document.getElementById("experience");
      if (!el) {
        const vh = Math.max(window.innerHeight, 1);
        targetPresence.current = window.scrollY > vh * 0.5 ? 1 : 0;
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);

      const enterStart = vh * 1.0;
      const enterEnd = vh * 0.2;
      const enterProgress = (enterStart - rect.top) / (enterStart - enterEnd);
      const clampedEnter = Math.min(Math.max(enterProgress, 0), 1);

      if (rect.bottom < vh * 0.5) {
        targetPresence.current = 1;
      } else {
        targetPresence.current = smoothstep(clampedEnter);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 1000 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />

        <Suspense fallback={null}>
          <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.0}>
            <SpaceBoiModel
              targetPresence={targetPresence}
              scrollSpeed={scrollSpeed}
            />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
