'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if we are on mobile
    const isMobile = window.innerWidth < 768;
    
    // On mobile, native scrolling is much smoother and more responsive
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // Reduced from 2 to avoid jitter
    });

    lenisRef.current = lenis;

    // Critical: tell GSAP ScrollTrigger to use Lenis's scroll position
    // so that scrub animations stay in sync with the smooth scroll.
    lenis.on('scroll', ScrollTrigger.update);

    // Also drive Lenis via GSAP's ticker for perfect frame sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after layout has settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
