"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const logos = [
  {
    name: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "Tailwind",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "NodeJS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "Django",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
  },
  {
    name: "Postgres",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "Prisma",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  },
  {
    name: "Firebase",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  },
  {
    name: "C++",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "TensorFlow",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "ThreeJS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
  },
];

const DARK_LOGOS = ["GitHub", "Prisma", "Express", "ThreeJS"];

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- CENTERED BASE GLOBE POSITIONING ---
    const GLOBE_BASE_Y = 0;
    const scene = new THREE.Scene();

    const initialDistance = 58;
    const targetDistance = 30;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, initialDistance);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    mainGroup.position.set(0, GLOBE_BASE_Y, 0);
    scene.add(mainGroup);

    // --- WINDOW-LEVEL MOUSE TRACKING FOR ROTATION + POSITION SHIFT ---
    const targetRotation = { x: 0, y: 0 };
    const targetPositionOffset = { x: 0, y: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position across the whole viewport (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Desired tilt values
      targetRotation.x = -y * 0.8;
      targetRotation.y = x * 1.2;

      // Subtle positional drag shift (max ~2.5 units movement along X and Y)
      targetPositionOffset.x = x * 2.5;
      targetPositionOffset.y = y * 2.5;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f3ff, 5, 50);
    pointLight.position.set(0, 0, 0);
    mainGroup.add(pointLight);

    // ==========================================
    // 1. FUTURISTIC CORE (INNER GLOWING PLASMA)
    // ==========================================
    const innerGeo = new THREE.IcosahedronGeometry(6.5, 4);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d8ff,
      emissive: 0x0a4b7c,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // ==========================================
    // 2. GEOMETRIC HOLOGRAPHIC OUTER SHELL
    // ==========================================
    const outerGeo = new THREE.IcosahedronGeometry(8.2, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const outerShell = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerShell);

    // Node Joints on Outer Shell
    const nodeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const posAttribute = outerGeo.getAttribute("position");
    const nodeGroup = new THREE.Group();

    for (let i = 0; i < posAttribute.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(posAttribute, i);
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(vertex);
      nodeGroup.add(node);
    }
    outerShell.add(nodeGroup);

    // ==========================================
    // 3. GYROSCOPIC SCI-FI ORBITAL RINGS
    // ==========================================
    const createSciFiRing = (
      radius: number,
      color: number,
      tubeRadius = 0.08,
    ) => {
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.2,
      });
      return new THREE.Mesh(ringGeo, ringMat);
    };

    const ring1 = createSciFiRing(9.8, 0x00f3ff, 0.06);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = createSciFiRing(10.6, 0xff0055, 0.05);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // ==========================================
    // 4. ATMOSPHERIC SHADER GLOW
    // ==========================================
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const glowSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(9.0, 3),
      glowMaterial,
    );
    mainGroup.add(glowSphere);

    // ==========================================
    // 5. TECH ICONS SETUP
    // ==========================================
    const textureLoader = new THREE.TextureLoader();
    const iconSprites: THREE.Sprite[] = [];
    const activeBlobUrls: string[] = [];

    logos.forEach((logo, i) => {
      fetch(logo.url)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((svgText) => {
          if (!svgText.includes("width=")) {
            svgText = svgText.replace("<svg", '<svg width="128" height="128"');
          }

          if (DARK_LOGOS.includes(logo.name)) {
            const whiteOverride = `<style>path, circle, rect, polygon, ellipse { fill: #ffffff !important; stroke: #ffffff !important; }</style>`;
            svgText = svgText.replace(">", `>${whiteOverride}`);
          }

          const blob = new Blob([svgText], { type: "image/svg+xml" });
          const blobUrl = URL.createObjectURL(blob);
          activeBlobUrls.push(blobUrl);

          textureLoader.load(blobUrl, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;

            const material = new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              opacity: 1.0,
              alphaTest: 0.05,
              depthWrite: false,
            });
            const sprite = new THREE.Sprite(material);

            const phi = Math.acos(-1 + (2 * i) / logos.length);
            const theta = Math.sqrt(logos.length * Math.PI) * phi;
            const radius = 13.0;

            sprite.position.setFromSphericalCoords(radius, phi, theta);
            sprite.scale.set(2.0, 2.0, 2.0);

            mainGroup.add(sprite);
            iconSprites.push(sprite);
          });
        })
        .catch((err) => {
          console.error(`Failed to load SVG for ${logo.name}:`, err);
        });
    });

    // ==========================================
    // 6. AMBIENT PARTICLES
    // ==========================================
    const particleCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 180;
    }
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.4,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // --- SCROLL BINDING ---
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        window.innerHeight,
      );

      targetProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationId: number;
    let accumulatedSpin = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      currentProgress += (targetProgress - currentProgress) * 0.08;
      const clampedProgress = Math.min(Math.max(currentProgress, 0), 1);

      // Camera zoom transition on scroll
      camera.position.z = THREE.MathUtils.lerp(
        initialDistance,
        targetDistance,
        clampedProgress,
      );

      // Smooth position shift (drag effect) relative to mouse coordinates
      mainGroup.position.x +=
        (targetPositionOffset.x - mainGroup.position.x) * 0.05;
      mainGroup.position.y +=
        (GLOBE_BASE_Y + targetPositionOffset.y - mainGroup.position.y) * 0.05;

      // Base continuous Y-axis spin
      mainGroup.rotation.y += 0.003;

      // Smooth mouse-tracking rotation response across screen
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.z +=
        (-targetRotation.y * 0.2 - mainGroup.rotation.z) * 0.05;

      accumulatedSpin += delta * 0.8;

      innerCore.rotation.y = accumulatedSpin;
      innerCore.rotation.z = accumulatedSpin * 0.35;

      outerShell.rotation.y = -accumulatedSpin * 0.9;
      outerShell.rotation.x = accumulatedSpin * 0.25;

      ring1.rotation.z = accumulatedSpin * 1.15;
      ring2.rotation.y = accumulatedSpin * 1.35;

      // Pulsing glow effects
      const pulse = 1 + Math.sin(time * 2.5) * 0.04;
      innerCore.scale.setScalar(pulse);
      glowSphere.scale.setScalar(1 + Math.sin(time * 1.4) * 0.025);

      iconSprites.forEach((sprite, i) => {
        sprite.scale.setScalar(2.0 + Math.sin(time * 1.5 + i) * 0.08);
      });

      particlesMesh.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      activeBlobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative z-0 pointer-events-none"
    />
  );
}
