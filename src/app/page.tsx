import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import FlavorsSection from '@/components/FlavorsSection';
import ProductSection from '@/components/ProductSection';
import { GlobeInteractive } from '@/components/ui/cobe-globe-interactive';
import { CinematicFooter } from '@/components/ui/motion-footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Typewriter } from '@/components/ui/typewriter';
import { ImageComparison } from '@/components/ui/image-comparison-slider';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative">
        <main className="relative z-10 min-h-screen bg-black text-white selection:bg-neutral-800">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 md:py-8 mix-blend-difference">
            <a href="/" className="text-lg md:text-xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">NOJO</a>
            <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium">
              <a href="#product" className="hover:text-neutral-400 transition-colors">Product</a>
              <a href="#variants" className="hover:text-neutral-400 transition-colors">Flavors</a>
              <a href="#ingredients" className="hover:text-neutral-400 transition-colors">Ingredients</a>
              <a href="#story" className="hover:text-neutral-400 transition-colors">Story</a>
              <a href="/terms" className="hover:text-neutral-400 transition-colors">Terms</a>
            </div>
            <a href="#variants" className="text-[10px] md:text-xs font-medium tracking-widest uppercase border border-white/30 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-white hover:text-black transition-colors">
              Shop Now
            </a>
          </nav>


          {/* Cinematic Hero Section */}
          {/* Cinematic Hero Section */}
          <CinematicHero 
            brandName="NUET"
            tagline1="The next level of"
            tagline2="premium refreshment."
            cardHeading="Exclusivity, redefined."
            cardDescription={<><span className="text-white font-semibold">NUET</span> delivers an unparalleled experience for those who demand the finest in cold refreshment and minimalist design.</>}
            metricValue={82}
            metricSuffix="K"
            metricLabel="Followers"
            ctaHeading="Join the NUET elite."
            ctaDescription="Experience the peak of refreshment with our limited edition collections."
          />

          {/* 1. Product Section */}
          <ProductSection />

          {/* 2. Flavors Section */}
          <FlavorsSection />

          {/* 3. Ingredients Section */}
          <section id="ingredients" className="min-h-[70vh] md:min-h-screen relative flex items-center justify-center overflow-hidden z-20">
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
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-[-2px] md:tracking-[-6px] leading-[0.9] mb-10">
                Pure. Crisp. Cold.
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-normal max-w-2xl mx-auto leading-relaxed">
                Hand-cut crystal ice meets micro-filtered sparkling cola. Every element engineered for the perfect texture, temperature, and taste.
              </p>
            </div>
          </section>

          {/* 4. Story Section */}
          <section id="story" className="py-24 md:py-48 px-6 bg-black z-20 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">The NOJO Philosophy</p>
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-[0.9] tracking-[-1px] md:tracking-[-2px]">
                <span className="text-neutral-300">Born in Nigatola.</span> <br />
                <span className="text-neutral-500 transition-colors hover:text-neutral-300 duration-500">We rejected the ordinary.</span> <br />
                <span className="text-neutral-600 transition-colors hover:text-neutral-300 duration-500">We stripped away the noise.</span> <br />
                <span className="text-white font-bold">We focused entirely on the essence of cold refreshment.</span>
              </h2>
            </div>
          </section>

          {/* 4.5 Typewriter Demo Section */}
          <section className="w-full min-h-[30vh] md:min-h-[40vh] md:text-4xl lg:text-6xl sm:text-3xl text-xl flex flex-row items-center justify-center bg-black font-normal overflow-hidden p-8 md:p-16 relative z-20 border-t border-white/5">
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
          <section className="w-full min-h-[60vh] md:min-h-screen bg-black py-16 md:py-32 px-6 relative z-20 flex flex-col items-center justify-center border-t border-white/5">
            <div className="max-w-4xl mx-auto w-full text-center mb-8 md:mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">The Difference</p>
              <h2 className="text-3xl md:text-6xl font-bold text-white tracking-[-2px] md:tracking-[-4px] leading-[0.9]">After Drinking NOJO</h2>
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

          {/* 4.8 Our Physical Store Section */}
          <section id="store" className="w-full min-h-[80vh] md:min-h-screen bg-black py-16 md:py-32 px-6 relative z-20 flex flex-col items-center justify-center border-t border-white/5">
            <div className="max-w-4xl mx-auto w-full text-center mb-8 md:mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Visit Us</p>
              <h2 className="text-3xl md:text-6xl font-bold text-white tracking-[-2px] md:tracking-[-4px] leading-[0.9] mb-6">Our Physical Store</h2>
              <p className="text-lg text-neutral-400 font-normal max-w-2xl mx-auto">
                Find the essence of cold in our flagship Nigatola locations. Interactive kiosks available for custom flavor profiles.
              </p>
            </div>
            <div className="w-full max-w-2xl aspect-square relative">
              <GlobeInteractive />
            </div>
          </section>

          {/* 5. CTA Section */}
          <section className="py-24 md:py-40 px-6 bg-neutral-950 border-t border-white/5 z-20 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-[-1px] md:tracking-[-6px] uppercase mb-6 leading-[0.9]">
                Experience NOJO
              </h2>
              <p className="text-lg md:text-2xl font-normal text-neutral-400 tracking-widest uppercase mb-10 md:mb-16">
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
        </main>

        {/* The Cinematic Footer is revealed from under the main content */}
        <CinematicFooter />
      </div>
    </SmoothScroll>
  );
}
