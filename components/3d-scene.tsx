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

// Adjusted keyframe journey for a balanced medium starting size
const JOURNEY = {
  camDist: [33, 23, 28],
  camY: [0, 1, 0],
  camAngle: [0, 0.4, 0.7],
  coreScale: [1, 1.2, 1.05],
  ringSpread: [0, 2.5, 1.2],
  iconSpread: [0, 1.2, 0.4],
  glowIntensity: [0.9, 1.4, 1.0],
  hue: [0.54, 0.58, 0.54],
};

function smoothstep(t: number) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

function sampleKeyframes(arr: number[], t: number) {
  const segs = arr.length - 1;
  const clamped = Math.min(Math.max(t, 0), 1);
  const scaled = clamped * segs;
  const idx = Math.min(Math.floor(scaled), segs - 1);
  const localT = scaled - idx;
  return THREE.MathUtils.lerp(arr[idx], arr[idx + 1], smoothstep(localT));
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, JOURNEY.camDist[0]);

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

    const targetRotation = { x: 0, y: 0 };
    const targetPositionOffset = { x: 0, y: 0 };
    const handleWindowMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = -y * 0.8;
      targetRotation.y = x * 1.2;
      targetPositionOffset.x = x * 2.5;
      targetPositionOffset.y = y * 2.5;
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00f3ff, 5, 50);
    pointLight.position.set(0, 0, 0);
    mainGroup.add(pointLight);

    // 1. Core
    const innerGeo = new THREE.IcosahedronGeometry(6.5, 4);
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

    // 2. Outer shell
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

    // 3. Rings
    const createSciFiRing = (
      radius: number,
      color: number,
      tubeRadius = 0.08,
    ) => {
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
      });
      return new THREE.Mesh(ringGeo, ringMat);
    };

    const ring1Pivot = new THREE.Group();
    const ring1 = createSciFiRing(9.8, 0x00f3ff, 0.06);
    ring1.rotation.x = Math.PI / 3;
    ring1Pivot.add(ring1);
    mainGroup.add(ring1Pivot);

    const ring2Pivot = new THREE.Group();
    const ring2 = createSciFiRing(10.6, 0xff0055, 0.05);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ring2Pivot.add(ring2);
    mainGroup.add(ring2Pivot);

    const ring1Normal = new THREE.Vector3(0, 0, 1)
      .applyEuler(ring1.rotation)
      .normalize();
    const ring2Normal = new THREE.Vector3(0, 0, 1)
      .applyEuler(ring2.rotation)
      .normalize();

    // 4. Glow
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uIntensity: { value: JOURNEY.glowIntensity[0] },
        uColor: { value: new THREE.Color().setHSL(JOURNEY.hue[0], 1, 0.5) },
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
      new THREE.IcosahedronGeometry(9.0, 3),
      glowMaterial,
    );
    mainGroup.add(glowSphere);

    // 5. Tech icons
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
            const baseRadius = 13.0;
            sprite.userData = { phi, theta, baseRadius, jitter: i * 0.37 };
            sprite.position.setFromSphericalCoords(baseRadius, phi, theta);
            sprite.scale.set(2.0, 2.0, 2.0);

            mainGroup.add(sprite);
            iconSprites.push(sprite);
          });
        })
        .catch((err) => {
          console.error(`Failed to load SVG for ${logo.name}:`, err);
        });
    });

    // 6. Ambient particles
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

    let targetHeroT = 0;
    let currentHeroT = 0;

    let targetSkillsT = 0;
    let currentSkillsT = 0;

    const computeSkillsProgress = () => {
      const el = document.getElementById("skills");
      if (!el) {
        targetSkillsT = 0;
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);

      const enterStart = vh * 0.85;
      const enterEnd = vh * 0.2;
      const enter = (enterStart - rect.top) / (enterStart - enterEnd);

      const exitStart = vh * 0.6;
      const exitEnd = vh * -0.2;
      const exit = (rect.bottom - exitEnd) / (exitStart - exitEnd);

      const clampedEnter = Math.min(Math.max(enter, 0), 1);
      const clampedExit = Math.min(Math.max(exit, 0), 1);
      targetSkillsT = smoothstep(clampedEnter) * smoothstep(clampedExit);
    };

    const handleScroll = () => {
      const vh = Math.max(window.innerHeight, 1);
      targetHeroT = window.scrollY / vh;
      computeSkillsProgress();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const clock = new THREE.Clock();
    let animationId: number;
    let accumulatedSpin = 0;
    const tmpColor = new THREE.Color();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      currentHeroT += (targetHeroT - currentHeroT) * 0.06;

      const journeyT = Math.min(Math.max(currentHeroT, 0), 1);
      const camDist = sampleKeyframes(JOURNEY.camDist, journeyT);
      const camYOff = sampleKeyframes(JOURNEY.camY, journeyT);
      const camAngle = sampleKeyframes(JOURNEY.camAngle, journeyT);
      const coreScaleTarget = sampleKeyframes(JOURNEY.coreScale, journeyT);
      const ringSpread = sampleKeyframes(JOURNEY.ringSpread, journeyT);
      const iconSpread = sampleKeyframes(JOURNEY.iconSpread, journeyT);
      const glowIntensity = sampleKeyframes(JOURNEY.glowIntensity, journeyT);
      const hue = sampleKeyframes(JOURNEY.hue, journeyT);

      const loadIn = smoothstep(time / 1.0);
      const recede = 1 - smoothstep((currentHeroT - 0.65) / 0.55);
      const presence = loadIn * recede;

      camera.position.x = Math.sin(camAngle) * camDist * 0.35;
      camera.position.z = Math.cos(camAngle) * camDist;
      camera.position.y = camYOff;
      camera.lookAt(mainGroup.position);

      mainGroup.position.x +=
        (targetPositionOffset.x - mainGroup.position.x) * 0.05;
      mainGroup.position.y +=
        (targetPositionOffset.y - mainGroup.position.y) * 0.05;
      mainGroup.rotation.y += 0.003;
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.z +=
        (-targetRotation.y * 0.2 - mainGroup.rotation.z) * 0.05;

      mainGroup.scale.setScalar(presence);

      accumulatedSpin += delta * 0.8;
      innerCore.rotation.y = accumulatedSpin;
      innerCore.rotation.z = accumulatedSpin * 0.35;
      outerShell.rotation.y = -accumulatedSpin * 0.9;
      outerShell.rotation.x = accumulatedSpin * 0.25;
      ring1.rotation.z = accumulatedSpin * 1.15;
      ring2.rotation.y = accumulatedSpin * 1.35;

      ring1Pivot.position.copy(ring1Normal).multiplyScalar(ringSpread);
      ring2Pivot.position.copy(ring2Normal).multiplyScalar(-ringSpread * 0.8);

      const pulse = 1 + Math.sin(time * 2.5) * 0.04;
      innerCore.scale.setScalar(pulse * coreScaleTarget);
      glowSphere.scale.setScalar(
        (1 + Math.sin(time * 1.4) * 0.025) * (0.9 + coreScaleTarget * 0.1),
      );

      tmpColor.setHSL(hue, 1, 0.5);
      glowMaterial.uniforms.uIntensity.value = glowIntensity * presence;
      glowMaterial.uniforms.uColor.value.copy(tmpColor);
      pointLight.color.copy(tmpColor);
      pointLight.intensity = 5 * presence;

      iconSprites.forEach((sprite) => {
        const { phi, theta, baseRadius, jitter } = sprite.userData as {
          phi: number;
          theta: number;
          baseRadius: number;
          jitter: number;
        };
        const radius =
          baseRadius + iconSpread * 4 + Math.sin(time * 0.6 + jitter) * 0.3;
        sprite.position.setFromSphericalCoords(radius, phi, theta);
        sprite.scale.setScalar(2.0 + Math.sin(time * 1.5 + jitter) * 0.08);
        (sprite.material as THREE.SpriteMaterial).opacity = presence;
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
