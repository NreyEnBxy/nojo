import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import CanvasSequence from '@/components/CanvasSequence';
import FlavorsSection from '@/components/FlavorsSection';
import ProductSection from '@/components/ProductSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Typewriter } from '@/components/ui/typewriter';
import { ImageComparison } from '@/components/ui/image-comparison-slider';
export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white selection:bg-neutral-800">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
          <a href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">NOJO</a>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium">
            <a href="#product" className="hover:text-neutral-400 transition-colors">Product</a>
            <a href="#variants" className="hover:text-neutral-400 transition-colors">Flavors</a>
            <a href="#ingredients" className="hover:text-neutral-400 transition-colors">Ingredients</a>
            <a href="#story" className="hover:text-neutral-400 transition-colors">Story</a>
            <a href="/terms" className="hover:text-neutral-400 transition-colors">Terms</a>
          </div>
          <a href="#variants" className="text-xs font-medium tracking-widest uppercase border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors">
            Shop Now
          </a>
        </nav>

        {/* Hero Canvas Animation - KEPT EXACTLY AS IT IS */}
        <CanvasSequence frameCount={210} folderPath="/frames/nojooooooo" prefix="ezgif-frame" />

        {/* 1. Product Section */}
        <ProductSection />

        {/* 2. Flavors Section */}
        <FlavorsSection />

        {/* 3. Ingredients Section */}
        <section id="ingredients" className="min-h-screen relative flex items-center justify-center overflow-hidden z-20">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/ingredients.png"
              alt="NOJO Ice and Cola Macro"
              fill
              className="object-cover opacity-60"
            />
            {/* Dark vignette to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-8">The Anatomy of Chill</p>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none mb-10">
              Pure. Crisp. Cold.
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
              Hand-cut crystal ice meets micro-filtered sparkling cola. Every element engineered for the perfect texture, temperature, and taste.
            </p>
          </div>
        </section>

        {/* 4. Story Section */}
        <section id="story" className="py-48 px-6 bg-black z-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">The NOJO Philosophy</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-snug md:leading-snug lg:leading-tight">
              <span className="text-neutral-300">Born in Nigatola.</span> <br />
              <span className="text-neutral-500 transition-colors hover:text-neutral-300 duration-500">We rejected the ordinary.</span> <br />
              <span className="text-neutral-600 transition-colors hover:text-neutral-300 duration-500">We stripped away the noise.</span> <br />
              <span className="text-white font-medium">We focused entirely on the essence of cold refreshment.</span>
            </h2>
          </div>
        </section>

        {/* 4.5 Typewriter Demo Section */}
        <section className="w-full min-h-[40vh] md:text-4xl lg:text-6xl sm:text-3xl text-2xl flex flex-row items-center justify-center bg-black font-light overflow-hidden p-16 relative z-20 border-t border-white/5">
          <div className="whitespace-pre-wrap text-center leading-relaxed">
            <span className="text-neutral-500">{"We were born to be a "}</span>
            <Typewriter
              text={[
                "nigga.",
                "kailla.",
                "madarchod.",
                "negro.",
                "dead man.",
              ]}
              speed={70}
              className="text-white font-medium"
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
          </div>
        </section>

        {/* 4.6 Image Comparison Section */}
        <section className="w-full min-h-screen bg-black py-32 px-6 relative z-20 flex flex-col items-center justify-center border-t border-white/5">
          <div className="max-w-4xl mx-auto w-full text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">The Difference</p>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">Before & After NOJO</h2>
          </div>
          <ImageComparison
            beforeImage="/images/before-after/before.png"
            afterImage="/images/before-after/after.png"
            altBefore="Before NOJO"
            altAfter="After NOJO"
          />
        </section>

        {/* 4.7 Testimonials Section */}
        <TestimonialsSection />

        {/* 5. CTA Section */}
        <section className="py-40 px-6 bg-neutral-950 border-t border-white/5 z-20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter uppercase mb-6">
              Experience NOJO
            </h2>
            <p className="text-xl md:text-2xl font-light text-neutral-400 tracking-widest uppercase mb-16">
              First Time In Nigatola
            </p>
            <a href="#variants" className="group relative px-12 py-5 bg-white text-black rounded-full overflow-hidden block">
              <div className="absolute inset-0 w-full h-full bg-neutral-200 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-medium text-sm tracking-widest uppercase">
                Acquire Now
              </span>
            </a>
          </div>
        </section>

        {/* 6. Footer */}
        <footer className="bg-black py-16 px-8 lg:px-20 border-t border-white/10 z-20 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <a href="/" className="inline-block text-3xl font-bold tracking-widest uppercase mb-4 hover:opacity-80 transition-opacity">NOJO</a>
              <p className="text-neutral-500 text-sm font-light">The definitive cold cola experience.</p>
              <p className="text-neutral-500 text-sm font-light mt-1">A productional product of NUET.</p>
            </div>

            <div className="flex gap-8 text-sm tracking-widest uppercase font-light text-neutral-400">
              <a
                href="https://www.facebook.com/nigatolauniversityofengineeringandtechnologyNUET"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Cond
              </a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-xs text-neutral-600 tracking-wider">
            &copy; {new Date().getFullYear()} NOJO INTL. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
