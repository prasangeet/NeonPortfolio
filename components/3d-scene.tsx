"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

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

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Base Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      70,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    // --- Post-Processing (Refined Glow) ---
    const renderScene = new RenderPass(scene, camera);

    // FIX: Lowered strength significantly, set threshold to 0 so dark icons glow too
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      ),
      0.15, // Strength: Very subtle now (was 0.3)
      0.1, // Radius: Tighter glow (was 0.2)
      0.0, // Threshold: Setting to 0 ensures everything glows a little bit, including dark icons
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // --- Objects ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Core (Black Hole)
    const coreGeometry = new THREE.IcosahedronGeometry(9, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.95,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreSphere);

    // Wireframe (The Light Source)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const wireframeSphere = new THREE.Mesh(coreGeometry, wireframeMaterial);
    wireframeSphere.scale.set(1.001, 1.001, 1.001);
    mainGroup.add(wireframeSphere);

    // Icons & Lines
    const textureLoader = new THREE.TextureLoader();
    const iconSprites: THREE.Sprite[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.3,
    });

    const count = logos.length;
    const phi_golden = Math.PI * (3 - Math.sqrt(5));

    logos.forEach((logo, i) => {
      textureLoader.load(logo.url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 1.0,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(material);

        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi_golden * i;
        const radius = 15;

        const x = radius * Math.cos(theta) * radiusAtY;
        const z = radius * Math.sin(theta) * radiusAtY;
        const yPos = radius * y;

        sprite.position.set(x, yPos, z);
        sprite.scale.set(3, 3, 3);

        mainGroup.add(sprite);
        iconSprites.push(sprite);

        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, yPos, z),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMaterial);
        mainGroup.add(line);
      });
    });

    // Particles (Stars)
    const particleCount = 250;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    // Store initial positions to animate from
    const initialPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
      initialPositions[i] = posArray[i];
    }
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xaaddff,
      transparent: true,
      opacity: 0.6,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // --- Interaction Logic ---
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation ---
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // 1. Calculate Targets
      mainGroup.rotation.y += 0.002; // Constant rotation
      targetRotation.x = mouse.y * 0.5;
      targetRotation.y = mouse.x * 0.5;

      // 2. Animate Main Sphere
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.z += (-targetRotation.y - mainGroup.rotation.z) * 0.05;

      // 3. Animate Stars (Mouse Interaction)
      particlesMesh.rotation.x +=
        (targetRotation.x * 0.2 - particlesMesh.rotation.x) * 0.05;
      particlesMesh.rotation.y +=
        (-targetRotation.y * 0.2 - particlesMesh.rotation.y) * 0.05;

      // 4. Pulse & Drift
      const scale = 1 + Math.sin(time * 1.5) * 0.02;
      wireframeSphere.scale.set(1.001 * scale, 1.001 * scale, 1.001 * scale);

      iconSprites.forEach((sprite, i) => {
        sprite.position.y += Math.sin(time * 2 + i) * 0.01;
      });

      const positions = particlesGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = initialPositions[i3] + Math.sin(time * 0.1 + i) * 2;
        positions[i3 + 1] =
          initialPositions[i3 + 1] + Math.cos(time * 0.15 + i) * 2;
        positions[i3 + 2] =
          initialPositions[i3 + 2] + Math.sin(time * 0.1 + i * 2) * 2;
      }
      particlesGeo.attributes.position.needsUpdate = true;

      composer.render();
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-96 relative overflow-hidden rounded-xl cursor-move bg-transparent"
    />
  );
}
