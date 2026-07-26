"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import BorderGlow from "./BorderGlow";

export interface BentoCardItem {
  id: string;
  title?: string;
  label?: string;
  description?: string;
  colSpan?: string;
  children?: React.ReactNode;
}

export interface BentoProps {
  cards?: BentoCardItem[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;

  // BorderGlow dynamic properties
  backgroundColor?: string;
  borderGlowColors?: string[];
  edgeSensitivity?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animatedGlow?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "255, 255, 255";
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (
  x: number,
  y: number,
  color: string,
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 0.8);
    box-shadow: 0 0 6px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  enableStars?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  enableStars = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => particle.remove(),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableStars) return;

    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const particle = createParticleElement(
          Math.random() * width,
          Math.random() * height,
          glowColor,
        );
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(particle, {
          opacity: 0.2,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 100);

      timeoutsRef.current.push(timeoutId);
    }
  }, [enableStars, particleCount, glowColor]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || disableAnimations) return;

    const ctx = gsap.context(() => {}, element);

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      ctx.add(() => {
        if (enableTilt) {
          gsap.to(element, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
        if (enableMagnetism) {
          gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      ctx.add(() => {
        if (enableTilt) {
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          gsap.to(element, {
            rotateX,
            rotateY,
            duration: 0.1,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        }

        if (enableMagnetism) {
          const magnetX = (x - centerX) * 0.05;
          const magnetY = (y - centerY) * 0.05;
          gsap.to(element, {
            x: magnetX,
            y: magnetY,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.hypot(
        Math.max(x, rect.width - x),
        Math.max(y, rect.height - y),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.2) 0%, rgba(${glowColor}, 0.08) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      ctx.add(() => {
        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          },
        );
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
      ctx.revert();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={style}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.1) 0%,
        rgba(${glowColor}, 0.05) 15%,
        rgba(${glowColor}, 0.02) 30%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const ctx = gsap.context(() => {});

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const mouseInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        ctx.add(() => {
          gsap.to(spotlightRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        cards.forEach((card) =>
          (card as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
        return;
      }

      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.max(
          0,
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
            Math.max(cardRect.width, cardRect.height) / 2,
        );

        let glowIntensity = 0;
        if (distance <= proximity) glowIntensity = 1;
        else if (distance <= fadeDistance)
          glowIntensity =
            (fadeDistance - distance) / (fadeDistance - proximity);

        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

        cardElement.style.setProperty("--glow-x", `${relativeX}%`);
        cardElement.style.setProperty("--glow-y", `${relativeY}%`);
        cardElement.style.setProperty(
          "--glow-intensity",
          glowIntensity.toString(),
        );
        cardElement.style.setProperty("--glow-radius", `${spotlightRadius}px`);
      });

      ctx.add(() => {
        gsap.to(spotlightRef.current, {
          left: e.clientX,
          top: e.clientY,
          opacity: 0.8,
          duration: 0.1,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      gridRef.current
        ?.querySelectorAll(".card")
        .forEach((card) =>
          (card as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
      if (spotlightRef.current) {
        ctx.add(() =>
          gsap.to(spotlightRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          }),
        );
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.remove();
      ctx.revert();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  cards = [],
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,

  // BorderGlow dynamic options with defaults matching theme
  backgroundColor = "var(--card)",
  borderGlowColors = ["#c084fc", "#f472b6", "#38bdf8"],
  edgeSensitivity = 30,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animatedGlow = false,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const dynamicStyles = useMemo(
    () => `
      .text-clamp-1 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden; }
      .text-clamp-2 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
    `,
    [],
  );

  return (
    <>
      <style>{dynamicStyles}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-1 w-full select-none relative"
        ref={gridRef}
      >
        {cards.map((card) => {
          const baseClassName = `card rounded-[var(--radius)] font-light overflow-hidden smooth-transition hover:-translate-y-0.5 ${
            card.colSpan || "col-span-12 md:col-span-4"
          }`;

          const cardInnerContent = card.children ? (
            card.children
          ) : (
            <div className="p-5 flex flex-col justify-between h-full min-h-[200px]">
              {card.label && (
                <div className="card__header flex justify-between gap-3 relative text-[var(--foreground)]">
                  <span className="card__label text-base">{card.label}</span>
                </div>
              )}
              <div className="card__content flex flex-col relative text-[var(--foreground)]">
                {card.title && (
                  <h3
                    className={`card__title font-normal text-base m-0 mb-1 ${
                      textAutoHide ? "text-clamp-1" : ""
                    }`}
                  >
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <p
                    className={`card__description text-xs leading-5 text-[var(--muted-foreground)] ${
                      textAutoHide ? "text-clamp-2" : ""
                    }`}
                  >
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          );

          return (
            <ParticleCard
              key={card.id}
              className={baseClassName}
              disableAnimations={shouldDisableAnimations}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
              enableStars={enableStars}
            >
              {enableBorderGlow ? (
                <BorderGlow
                  edgeSensitivity={edgeSensitivity}
                  glowColor="40 80 80"
                  backgroundColor={backgroundColor}
                  borderRadius={10}
                  glowRadius={glowRadius}
                  glowIntensity={glowIntensity}
                  coneSpread={coneSpread}
                  animated={animatedGlow}
                  colors={borderGlowColors}
                >
                  {cardInnerContent}
                </BorderGlow>
              ) : (
                cardInnerContent
              )}
            </ParticleCard>
          );
        })}
      </div>
    </>
  );
};

export default MagicBento;
