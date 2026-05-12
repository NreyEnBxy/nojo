"use client";

import React, { useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCT_DATA = {
  velocity: {
    title: "VELOCITY",
    badge: "Limited Release",
    image: "/images/showcase-product.png",
    accent: "text-red-500",
    bg: "bg-red-500/10",
    description: "NOJO Velocity is more than just a drink; it's an experience engineered for the fast-paced modern life. Infused with natural electrolytes and a proprietary micro-filtered blend.",
    profile: "Arctic Lime & Sparkling Essence",
    temp: "-2°C Precision Chilled"
  },
  zenith: {
    title: "ZENITH",
    badge: "Ultra Luxury",
    image: "/images/showcase/special-edition.png",
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    description: "The Zenith edition represents the absolute peak of craft refreshment. Each bottle is a testament to minimalist design and the pursuit of pure, unadulterated essence.",
    profile: "Golden Citrus & Rare Botanicals",
    temp: "1°C Artisan Chill"
  },
  speed: {
    title: "SPEED COLLIDE",
    badge: "Exclusive Collab",
    image: "/images/showcase/ishowspeed.jpeg",
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    description: "The Speed Collide edition marks a historic partnership between NOJO and global icon IShowSpeed. Designed for high-octane moments and unstoppable energy.",
    profile: "Blue Raspberry & Electrifying Spark",
    temp: "-5°C Extreme Chill"
  },
  classic: {
    title: "CLASSIC NOIR",
    badge: "The Heritage",
    image: "/images/showcase/nojo bottle.jpeg",
    accent: "text-neutral-400",
    bg: "bg-neutral-500/10",
    description: "Classic Noir is the foundation of the NOJO legacy. A timeless formula that prioritizes pure refreshment and the essence of cold, refined for the elite.",
    profile: "Pure Mineral & Micro-Filtered Cola",
    temp: "0°C Perfect Balance"
  }
};

function DetailsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product") || "velocity";
  const product = PRODUCT_DATA[productId as keyof typeof PRODUCT_DATA] || PRODUCT_DATA.velocity;
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
  }, [productId]);

  return (
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
            src={product.image}
            alt={product.title}
            fill
            className="object-cover opacity-30 scale-110 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p className={cn("reveal font-bold tracking-[0.4em] uppercase mb-4", product.accent)}>{product.badge}</p>
          <h1 className="reveal text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-8">
            {product.title}
          </h1>
        </div>
      </section>

      {/* Details Content */}
      <section className="max-w-5xl mx-auto px-6 py-32 space-y-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">The Essence of Quality.</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              {product.description}
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4 py-4 border-b border-white/10">
                <span className={cn("font-bold w-24", product.accent)}>PROFILE</span>
                <span className="text-white">{product.profile}</span>
              </div>
              <div className="flex items-center gap-4 py-4 border-b border-white/10">
                <span className={cn("font-bold w-24", product.accent)}>TEMP</span>
                <span className="text-white">{product.temp}</span>
              </div>
            </div>
          </div>
          <div className={cn("reveal relative aspect-square rounded-[2rem] overflow-hidden border border-white/5", product.bg)}>
            <Image
              src={product.image}
              alt="Product Detail"
              fill
              className="object-contain p-12 drop-shadow-2xl"
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
  );
}

export default function ShowcaseDetails() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <SmoothScroll>
        <DetailsContent />
      </SmoothScroll>
    </Suspense>
  );
}
