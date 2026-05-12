"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        [contentRef.current, imageRef.current],
        { opacity: 0, x: (i) => (i === 0 ? -50 : 50) },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-4 md:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
      }}
    >
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="relative w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-red-600 to-red-800 shadow-[0_40px_100px_-20px_rgba(220,38,38,0.3)]"
        >
          {/* Coca-Cola style wave */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-full h-full opacity-30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 450C300 350 600 550 1200 450V600H0V450Z"
                fill="white"
              />
              <path
                d="M0 500C400 450 800 550 1200 500V600H0V500Z"
                fill="white"
                className="opacity-50"
              />
            </svg>
          </div>

          <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16 lg:p-24">
            {/* Left Content */}
            <div ref={contentRef} className="w-full md:w-1/2 text-white space-y-6">
              <div className="space-y-2">
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-red-100/80">
                  Limited Edition
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
                  NOJO <br />
                  <span className="text-red-200">Velocity.</span>
                </h2>
              </div>
              <p className="text-sm md:text-lg text-red-500 font-medium bg-white/95 px-4 py-1 inline-block rounded-full">
                COMING MAY 2026
              </p>
              <div className="pt-4">
                <Link
                  href="/showcase-details"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.4)]"
                >
                  <span className="relative z-10 font-bold uppercase tracking-widest text-sm">
                    Explore Details
                  </span>
                  <div className="absolute inset-0 bg-red-50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                </Link>
              </div>
            </div>

            {/* Right Product Image */}
            <div
              ref={imageRef}
              className="w-full md:w-1/2 h-full relative flex items-center justify-center mt-8 md:mt-0"
            >
              <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-105">
                <Image
                  src="/images/showcase-product.png"
                  alt="NOJO Velocity Edition"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
