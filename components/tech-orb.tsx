"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Same visual language as the hero orb (core + shell + tech-icon sprites)
// but self-contained: sized to whatever parent div you put it in, no
// window-level scroll listener, no fixed positioning. Drop this inside
// the Skills section, e.g.:
//
//   <div className="relative w-full h-[420px]">
//     <TechOrb />
//   </div>
//
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

export function TechOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      1000,
    );
    camera.position.set(0, 0, 22);

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
    scene.add(mainGroup);

    // Local (container-relative) mouse tilt instead of window-level
    const targetRotation = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotation.x = -y * 0.4;
      targetRotation.y = x * 0.6;
    };
    container.addEventListener("mousemove", handleMouseMove);

    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00f3ff, 5, 40);
    mainGroup.add(pointLight);

    const innerGeo = new THREE.IcosahedronGeometry(4.6, 4);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d8ff,
      emissive: 0x0a4b7c,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    const outerGeo = new THREE.IcosahedronGeometry(6.0, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const outerShell = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerShell);

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uIntensity: { value: 1.1 },
        uColor: { value: new THREE.Color(0x00d8ff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float uIntensity;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(uColor, 1.0) * intensity * uIntensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const glowSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6.6, 3),
      glowMaterial,
    );
    mainGroup.add(glowSphere);

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
            const radius = 9.5;
            sprite.userData = { jitter: i * 0.37 };
            sprite.position.setFromSphericalCoords(radius, phi, theta);
            sprite.scale.set(1.5, 1.5, 1.5);

            mainGroup.add(sprite);
            iconSprites.push(sprite);
          });
        })
        .catch((err) => {
          console.error(`Failed to load SVG for ${logo.name}:`, err);
        });
    });

    const clock = new THREE.Clock();
    let animationId: number;
    let accumulatedSpin = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      mainGroup.rotation.y += 0.0025;
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.z +=
        (-targetRotation.y * 0.15 - mainGroup.rotation.z) * 0.05;

      accumulatedSpin += delta * 0.7;
      innerCore.rotation.y = accumulatedSpin;
      outerShell.rotation.y = -accumulatedSpin * 0.9;

      const pulse = 1 + Math.sin(time * 2.2) * 0.03;
      innerCore.scale.setScalar(pulse);
      glowSphere.scale.setScalar(1 + Math.sin(time * 1.3) * 0.02);

      iconSprites.forEach((sprite) => {
        const { jitter } = sprite.userData as { jitter: number };
        sprite.scale.setScalar(1.5 + Math.sin(time * 1.4 + jitter) * 0.06);
      });

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
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      renderer.dispose();
      activeBlobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
