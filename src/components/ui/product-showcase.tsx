"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  {
    id: "velocity",
    title: "Velocity",
    subtitle: "COMING MAY 2026",
    badge: "Limited Edition",
    description: "Experience the peak of refreshment with our limited edition collections.",
    image: "/images/showcase-product.png",
    color: "from-red-600 to-red-800",
    glowColor: "bg-red-600/10",
    buttonColor: "text-red-600",
    detailsLink: "/showcase-details?product=velocity"
  },
  {
    id: "speed",
    title: "Speed Collide",
    subtitle: "SPECIAL COLLAB",
    badge: "Exclusive",
    description: "The most energetic collaboration in Nigatola history. Feel the speed.",
    image: "/images/showcase/ishowspeed.jpeg",
    color: "from-blue-600 to-indigo-900",
    glowColor: "bg-blue-600/10",
    buttonColor: "text-blue-600",
    detailsLink: "/showcase-details?product=speed"
  },
  {
    id: "classic",
    title: "Classic Noir",
    subtitle: "TIMELESS TASTE",
    badge: "The Original",
    description: "The bottle that started it all. Pure, crisp, and undeniably NOJO.",
    image: "/images/showcase/nojo bottle.jpeg",
    color: "from-neutral-800 to-neutral-950",
    glowColor: "bg-neutral-600/10",
    buttonColor: "text-neutral-900",
    detailsLink: "/showcase-details?product=classic"
  }
];

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const product = PRODUCTS[currentIndex];

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const changeSlide = (index: number) => {
    if (isAnimating.current || index === currentIndex) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(index);
        gsap.fromTo(
          [contentRef.current, imageRef.current],
          { opacity: 0, x: (i) => (i === 0 ? -30 : 30), filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            onComplete: () => {
              isAnimating.current = false;
            }
          }
        );
      }
    });

    tl.to([contentRef.current, imageRef.current], {
      opacity: 0,
      x: (i) => (i === 0 ? 30 : -30),
      filter: "blur(10px)",
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.in"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-4 md:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
      }}
    >
      {/* Background soft glow - Dynamic based on product */}
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl blur-[120px] rounded-full pointer-events-none transition-colors duration-1000", product.glowColor)} />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={cardRef}
          className={cn(
            "relative w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000",
            product.color
          )}
        >
          {/* Coca-Cola style wave */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-full h-full opacity-20"
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
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                  {product.badge}
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
                  NOJO <br />
                  <span className="opacity-80">{product.title}.</span>
                </h2>
              </div>
              <p className="text-sm md:text-lg font-bold bg-white/95 px-4 py-1 inline-block rounded-full transition-colors duration-500" style={{ color: "var(--tw-gradient-from)" }}>
                {product.subtitle}
              </p>
              <p className="text-white/60 text-sm md:text-base max-w-sm font-light">
                {product.description}
              </p>
              <div className="pt-4">
                <Link
                  href={product.detailsLink}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.4)]"
                >
                  <span className={cn("relative z-10 font-bold uppercase tracking-widest text-sm", product.buttonColor)}>
                    Explore Details
                  </span>
                  <div className="absolute inset-0 bg-neutral-100 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
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
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {PRODUCTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => changeSlide(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentIndex === idx 
                    ? "bg-white w-8" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Navigation Arrows */}
        <button 
          onClick={() => changeSlide((currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length)}
          className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={() => changeSlide((currentIndex + 1) % PRODUCTS.length)}
          className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
