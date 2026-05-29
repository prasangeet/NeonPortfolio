"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Reverted back to valid .svg endpoints
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

    const GLOBE_Y_POSITION = -9;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.target.set(0, GLOBE_Y_POSITION, 0);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      ),
      0.15,
      0.1,
      0.0,
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const mainGroup = new THREE.Group();
    mainGroup.position.y = GLOBE_Y_POSITION;
    scene.add(mainGroup);

    // Core
    const coreGeometry = new THREE.IcosahedronGeometry(10, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.95,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreSphere);

    // Wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeSphere = new THREE.Mesh(coreGeometry, wireframeMaterial);
    wireframeSphere.scale.set(1.01, 1.01, 1.01);
    mainGroup.add(wireframeSphere);

    // Icons Setup
    const textureLoader = new THREE.TextureLoader();
    const iconSprites: THREE.Sprite[] = [];
    const activeBlobUrls: string[] = [];

    logos.forEach((logo, i) => {
      // FIX: Fetch SVG code to inject explicit rasterization dimensions
      fetch(logo.url)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((svgText) => {
          // Force explicit width/height into the root <svg> tag if missing
          if (!svgText.includes("width=")) {
            svgText = svgText.replace("<svg", '<svg width="128" height="128"');
          }

          // Create a local blob URL that WebGL can safely read as a discrete raster boundary
          const blob = new Blob([svgText], { type: "image/svg+xml" });
          const blobUrl = URL.createObjectURL(blob);
          activeBlobUrls.push(blobUrl);

          textureLoader.load(blobUrl, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              opacity: 0.9,
              depthWrite: false,
            });
            const sprite = new THREE.Sprite(material);

            const phi = Math.acos(-1 + (2 * i) / logos.length);
            const theta = Math.sqrt(logos.length * Math.PI) * phi;
            const radius = 16;

            sprite.position.setFromSphericalCoords(radius, phi, theta);
            sprite.scale.set(2.5, 2.5, 2.5);

            mainGroup.add(sprite);
            iconSprites.push(sprite);
          });
        })
        .catch((err) => {
          console.error(`Failed to inline and load SVG for ${logo.name}:`, err);
        });
    });

    // Stars Particles
    const particleCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xaaddff,
      transparent: true,
      opacity: 0.4,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Animation loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      controls.update();

      iconSprites.forEach((sprite, i) => {
        sprite.scale.setScalar(2.5 + Math.sin(time * 2 + i) * 0.1);
      });

      particlesMesh.rotation.y = time * 0.05;

      composer.render();
    };
    animate();

    // Resize handlers
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) return;

      camera.aspect = width / height;

      const virtualHeight = height * 1.3;
      camera.setViewOffset(width, virtualHeight, 0, 0, width, height);

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      composer.dispose();
      // Clean up memory allocations
      activeBlobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative z-0" />;
}
