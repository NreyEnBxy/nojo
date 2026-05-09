'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductSection() {
  return (
    <section id="product" className="min-h-screen flex items-center bg-black py-32 px-6 lg:px-20 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image (Slides from Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Apple-like custom easing
          className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 bg-neutral-950"
        >
          <Image 
            src="/images/product_main.png" 
            alt="NOJO Premium Cold Cola Bottle" 
            fill
            className="object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="(max-w-768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </motion.div>
        
        {/* Right Side: Text Elements (Slide up with stagger) */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm uppercase tracking-[0.3em] text-neutral-500"
            >
              The Signature
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-[-2px] md:tracking-[-4px] leading-[0.9]"
            >
              Uncompromising <br /><span className="font-bold">Refreshment.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-lg md:text-xl font-normal leading-relaxed max-w-lg"
          >
            A harmonious blend of deep-roasted complexity and crisp effervescence. Meticulously crafted and chilled to absolute perfection. This is not just cola; it is the definitive cold sensory experience.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4"
          >
            <a href="#variants" className="inline-block px-8 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all duration-300 transform hover:scale-105">
              Discover NOJO
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
