"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
/* Using Outfit/Helvetica stack */

.cinematic-footer-wrapper {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Pure Black Theme Variables */
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.1);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.08);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.12);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.05);
  --pill-border-hover: rgba(255, 255, 255, 0.2);
  --pill-shadow-hover: rgba(0, 0, 0, 0.7);
  --pill-highlight-hover: rgba(255, 255, 255, 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.6; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.8)); }
  30% { transform: scale(1); }
}

@keyframes footer-float {
  0%, 100% { transform: translate(-50%, -10px); }
  50% { transform: translate(-50%, 10px); }
}

.animate-footer-breathe {
  animation: footer-breathe 12s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.animate-footer-float {
  animation: footer-float 6s ease-in-out infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Aurora Glow for Black Theme */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.03) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  /* Fix for iOS tap highlight */
  -webkit-tap-highlight-color: transparent;
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #fff;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 26vw;
  @media (max-width: 768px) {
    font-size: 35vw;
  }
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.15));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      // Disable magnetic effect on touch devices for better iOS/Mobile feel
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouch) return;

      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.02,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-8 md:space-x-12 px-4 md:px-6">
    <span>PREMIUM COLA</span> <span className="text-white/20">✦</span>
    <span>PURE ESSENCE</span> <span className="text-white/20">✦</span>
    <span>LIMITED EDITION</span> <span className="text-white/20">✦</span>
    <span>EXPERIENCE COLD</span> <span className="text-white/20">✦</span>
    <span>BORN IN NIGATOLA</span> <span className="text-white/20">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Background Giant Text Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "30vh", scale: 0.6, opacity: 0, rotate: -3 },
        {
          y: "-5vh",
          scale: 1.1,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 100%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      // 2. Aurora/Light Parallax
      gsap.to(".footer-aurora", {
        y: "-15vh",
        scale: 1.2,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      // 3. Main Content Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 75%",
          end: "bottom bottom",
          scrub: 1.2,
        }
      });

      tl.fromTo(headingRef.current, 
        { y: 160, opacity: 0, skewY: 7, scale: 0.85 }, 
        { y: 0, opacity: 1, skewY: 0, scale: 1, ease: "expo.out", duration: 1.5 }
      )
      .fromTo(linksRef.current?.children || [], 
        { y: 60, opacity: 0, scale: 0.8, rotateX: -45 }, 
        { y: 0, opacity: 1, scale: 1, rotateX: 0, stagger: 0.1, ease: "back.out(1.2)", duration: 1 },
        "-=0.6"
      )
      .fromTo(bottomBarRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: "power4.out", duration: 1 },
        "-=0.4"
      );

      // 4. Marquee Speed Reactive to Scroll
      gsap.to(".animate-footer-scroll-marquee", {
        timeScale: 3,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      <div
        ref={wrapperRef}
        className="relative min-h-[80vh] md:h-screen w-full pointer-events-none"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex min-h-[100dvh] md:h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#000] text-white cinematic-footer-wrapper pointer-events-auto z-0 pb-safe transform-gpu translate-z-0">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] md:h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] md:blur-[100px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-30 md:opacity-40" />

          {/* Giant background text with floating animation */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute bottom-[28vh] md:bottom-[30vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none animate-footer-float"
          >
            NOJO
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-10 md:top-12 left-0 w-full overflow-hidden border-y border-white/5 bg-black/40 backdrop-blur-xl py-4 md:py-5 z-10 -rotate-1 scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex w-max animate-footer-scroll-marquee text-[10px] md:text-sm font-bold tracking-[0.3em] md:tracking-[0.4em] text-white/40 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 md:px-6 mt-20 md:mt-24 mb-10 md:mb-0 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl lg:text-9xl font-bold footer-text-glow tracking-[-2px] md:tracking-[-6px] mb-8 md:mb-16 text-center leading-[0.9]"
            >
              Ready to <br className="hidden md:block" /> begin?
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 md:gap-8 w-full">
              {/* App Store Links (Primary) */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 w-full px-4">
                <MagneticButton as="a" href="https://www.facebook.com/nigatolauniversityofengineeringandtechnologyNUET" target="_blank" rel="noopener noreferrer" className="footer-glass-pill px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-bold text-xs md:text-base flex items-center justify-center gap-3 group">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Follow NUET
                </MagneticButton>
                
                <MagneticButton as="a" href="mailto:contact.nuetvc@gmail.com" className="footer-glass-pill px-8 md:px-12 py-4 md:py-6 rounded-full text-white font-bold text-xs md:text-base flex items-center justify-center gap-3 group">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Contact VC
                </MagneticButton>
              </div>

              {/* Secondary Text Links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-8 w-full mt-2 md:mt-4 px-4 text-center">
                <MagneticButton as="a" href="/privacy" className="footer-glass-pill px-5 md:px-8 py-2.5 md:py-4 rounded-full text-white/50 font-medium text-[10px] md:text-sm hover:text-white">
                  Privacy
                </MagneticButton>
                <MagneticButton as="a" href="/terms" className="footer-glass-pill px-5 md:px-8 py-2.5 md:py-4 rounded-full text-white/50 font-medium text-[10px] md:text-sm hover:text-white">
                  Terms
                </MagneticButton>
                <MagneticButton as="a" href="https://www.supportkori.com/nuet" target="_blank" rel="noopener noreferrer" className="footer-glass-pill px-5 md:px-8 py-2.5 md:py-4 rounded-full text-white/50 font-medium text-[10px] md:text-sm hover:text-white">
                  Support
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div ref={bottomBarRef} className="relative z-20 w-full pb-6 md:pb-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* Copyright */}
            <div className="text-white/30 text-[8px] md:text-xs font-semibold tracking-[0.2em] uppercase order-3 md:order-1">
              © 2026 NOJO INT.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-2 md:gap-3 order-1 md:order-2 cursor-default border-white/5">
              <span className="text-white/40 text-[8px] md:text-xs font-bold uppercase tracking-widest">Crafted by</span>
              <span className="text-white font-black text-[10px] md:text-sm tracking-normal">NUET</span>
              <span className="animate-footer-heartbeat text-xs md:text-base text-red-500">❤</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full footer-glass-pill flex items-center justify-center text-white/50 hover:text-white group order-2 md:order-3 shadow-2xl"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
