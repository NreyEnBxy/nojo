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
    subtitle: "MAY 2026",
    badge: "Limited Release",
    description: "Engineered for high-performance refreshment with a precision-chilled finish.",
    image: "/images/showcase-product.png",
    color: "from-red-600/60 to-red-950/80",
    glowColor: "bg-red-600/20",
    buttonColor: "text-red-600",
    detailsLink: "/showcase-details?product=velocity",
    specs: ["0 CAL", "EXTREME CHILL", "ELECTROLYTES"]
  },
  {
    id: "speed",
    title: "Speed",
    subtitle: "COLLAB",
    badge: "Exclusive",
    description: "The official IShowSpeed energy blend. Unstoppable power in every sip.",
    image: "/images/showcase/ishowspeed.jpeg",
    color: "from-blue-600/60 to-indigo-950/80",
    glowColor: "bg-blue-600/20",
    buttonColor: "text-blue-600",
    detailsLink: "/showcase-details?product=speed",
    specs: ["HIGH ENERGY", "BLUE RASPBERRY", "NO LIMITS"]
  },
  {
    id: "classic",
    title: "Classic",
    subtitle: "HERITAGE",
    badge: "The Original",
    description: "The foundation of cold refreshment. Timeless taste, refined for the elite.",
    image: "/images/showcase/nojo bottle.jpeg",
    color: "from-neutral-800/60 to-black/80",
    glowColor: "bg-neutral-600/20",
    buttonColor: "text-neutral-900",
    detailsLink: "/showcase-details?product=classic",
    specs: ["PURE MINERAL", "PREMIUM COLA", "ICE FILTERED"]
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
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    const interval = setInterval(() => {
      if (!isAnimating.current) {
        const nextIndex = (currentIndex + 1) % PRODUCTS.length;
        changeSlide(nextIndex);
      }
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [currentIndex]);

  const changeSlide = (index: number) => {
    if (isAnimating.current || index === currentIndex) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(index);
        gsap.fromTo(
          [contentRef.current, imageRef.current, ".floating-spec"],
          { opacity: 0, y: 30, filter: "blur(15px)" },
          {
            opacity: 1,
            y: 0,
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

    tl.to([contentRef.current, imageRef.current, ".floating-spec"], {
      opacity: 0,
      y: -30,
      filter: "blur(15px)",
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.in"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-12 md:py-24 px-4 md:px-12 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background soft glow */}
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl blur-[150px] rounded-full pointer-events-none transition-colors duration-1000", product.glowColor)} />

      <div className="w-full h-full max-w-[1600px] relative">
        <div
          ref={cardRef}
          className="relative w-full min-h-[85vh] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/5 bg-neutral-900"
        >
          {/* 
              STRICT FULL-BLEED IMAGE CONTAINER 
              - No padding, no margins, touch absolute edges 
          */}
          <div ref={imageRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover w-full h-full block transition-transform duration-1000"
              style={{ objectFit: 'cover' }}
              priority
            />
            
            {/* Direct Overlay Mask (No padding) */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-r transition-all duration-1000",
                product.color
            )} />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Background Decor Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-10 pointer-events-none select-none">
            <h2 className="text-[25vw] font-black uppercase tracking-tighter whitespace-nowrap leading-none text-white">
              {product.title}
            </h2>
          </div>

          {/* Coca-Cola style wave (Ensured edge-to-edge) */}
          <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden pointer-events-none">
            <svg
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              className="w-full h-[300px] opacity-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 200C300 100 600 300 1200 200V300H0V200Z" fill="white" />
              <path d="M0 250C400 200 800 300 1200 250V300H0V250Z" fill="white" className="opacity-50" />
            </svg>
          </div>

          <div className="relative z-30 w-full h-full flex flex-col justify-center items-center lg:items-start p-8 md:p-16 lg:p-24 min-h-[85vh]">
            
            {/* Overlaid Content (Has padding for legibility, but image behind it is full-bleed) */}
            <div ref={contentRef} className="w-full flex flex-col justify-center text-center lg:text-left space-y-8 max-w-4xl">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                   <span className="px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white">
                    {product.badge}
                  </span>
                </div>
                <h2 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-white drop-shadow-2xl">
                  {product.title}<span className="text-white/40">.</span>
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/95 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-lg">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="floating-spec flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                    <span className="text-[8px] font-bold tracking-widest text-white/60 mb-1 uppercase">Spec</span>
                    <span className="text-[10px] md:text-xs font-black text-white text-center leading-tight px-1">{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href={product.detailsLink}
                  className="group relative inline-flex items-center justify-center px-12 py-5 bg-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                >
                  <span className={cn("relative z-10 font-black uppercase tracking-widest text-base", product.buttonColor)}>
                    Explore Details
                  </span>
                  <div className="absolute inset-0 bg-neutral-100 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                </Link>
              </div>
            </div>

            {/* Technical Labels */}
            <div className="absolute top-10 right-10 flex flex-col gap-4 hidden md:flex">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl rotate-3 shadow-2xl">
                <p className="text-[10px] font-bold text-white/50 uppercase mb-1">Pressure</p>
                <p className="text-xl font-black text-white">4.5 BAR</p>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl -rotate-3 shadow-2xl">
                <p className="text-[10px] font-bold text-white/50 uppercase mb-1">Purity</p>
                <p className="text-xl font-black text-white">99.9%</p>
              </div>
            </div>

          </div>

          {/* Navigation UI */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-4">
            {PRODUCTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => changeSlide(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  currentIndex === idx 
                    ? "bg-white w-10" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Arrows */}
        <button 
          onClick={() => changeSlide((currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length)}
          className="absolute left-4 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={() => changeSlide((currentIndex + 1) % PRODUCTS.length)}
          className="absolute right-4 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
