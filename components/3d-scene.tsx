"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

    // --- Configuration ---
    // This value controls how high/low the globe sits.
    // -8 raises it so it's "lying at the bottom" but clearly visible.
    const GLOBE_Y_POSITION = -9;

    // --- Base Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    // Position camera back enough to see the whole system
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

    // --- Orbit Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // CRITICAL FIX: Set the target to exactly where the globe is.
    // This ensures the camera rotates around the globe, not empty space.
    controls.target.set(0, GLOBE_Y_POSITION, 0);

    // --- Post-Processing ---
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

    // --- Objects ---
    const mainGroup = new THREE.Group();
    mainGroup.position.y = GLOBE_Y_POSITION;
    scene.add(mainGroup);

    // Core (Black Hole)
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

    // Icons
    const textureLoader = new THREE.TextureLoader();
    const iconSprites: THREE.Sprite[] = [];

    logos.forEach((logo, i) => {
      textureLoader.load(logo.url, (texture) => {
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
    });

    // Particles (Stars)
    // Note: We add these to 'scene', not 'mainGroup', so they don't rotate with the globe drag
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

    // --- Animation ---
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      controls.update();

      // Gentle floating animation for icons
      iconSprites.forEach((sprite, i) => {
        // Just a tiny wobble
        sprite.scale.setScalar(2.5 + Math.sin(time * 2 + i) * 0.1);
      });

      // Ambient particle rotation
      particlesMesh.rotation.y = time * 0.05;

      composer.render();
    };
    animate();

    // --- Resize & Offset ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;

      // OPTICAL OFFSET:
      // Since the globe is at Y = -9, if we look directly at it, it will be in the CENTER of the screen.
      // We want it at the BOTTOM.
      // setViewOffset allows us to shift the window so the center point is physically lower on the screen.
      // (val 1: fullWidth, val 2: fullHeight, val 3: x-offset, val 4: y-offset, val 5: width, val 6: height)
      // A negative Y offset shifts the view UP, pushing the object DOWN.
      const verticalOffset = -height * 0.15; // 15% offset
      camera.setViewOffset(width, height, 0, verticalOffset, width, height);

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    // Initial call
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative z-0" />;
}
