"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import { CinematicFooter } from "@/components/ui/motion-footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShowcaseDetails() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="bg-black text-white min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">NOJO</Link>
          <Link href="/" className="text-xs font-medium tracking-widest uppercase border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors">
            Back Home
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase-product.png"
              alt="NOJO Velocity"
              fill
              className="object-cover opacity-40 scale-110 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
          </div>

          <div className="relative z-10 text-center px-4">
            <p className="reveal text-red-500 font-bold tracking-[0.4em] uppercase mb-4">Limited Release</p>
            <h1 className="reveal text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-8">
              VELOCITY
            </h1>
          </div>
        </section>

        {/* Details Content */}
        <section className="max-w-5xl mx-auto px-6 py-32 space-y-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">The Science of Speed.</h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                NOJO Velocity is more than just a drink; it's an experience engineered for the fast-paced modern life. Infused with natural electrolytes and a proprietary micro-filtered blend, it provides instant refreshment with zero crash.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 py-4 border-b border-white/10">
                  <span className="text-red-500 font-bold w-24">PROFILE</span>
                  <span className="text-white">Arctic Lime & Sparkling Essence</span>
                </div>
                <div className="flex items-center gap-4 py-4 border-b border-white/10">
                  <span className="text-red-500 font-bold w-24">TEMP</span>
                  <span className="text-white">-2°C Precision Chilled</span>
                </div>
              </div>
            </div>
            <div className="reveal relative aspect-square rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/5">
              <Image
                src="/images/showcase-product.png"
                alt="Product Detail"
                fill
                className="object-contain p-12"
              />
            </div>
          </div>

          <div className="reveal text-center space-y-8 py-24">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              "Redefining the boundaries of premium refreshment."
            </h3>
            <p className="text-neutral-500 uppercase tracking-widest text-sm">Nigatola University of Engineering and Technology</p>
          </div>
        </section>

        <CinematicFooter />
      </div>
    </SmoothScroll>
  );
}
