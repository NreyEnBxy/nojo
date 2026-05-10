'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-10 left-10"
      >
        <Link href="/" className="text-sm tracking-widest uppercase text-neutral-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
          &larr; Back to NOJO
        </Link>
      </motion.div>

      {/* Main Animated Text */}
      <div className="px-4 py-12">
        <BlurFade delay={0.25} inView yOffset={60} duration={1.2}>
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-center max-w-5xl px-6 leading-[0.9] tracking-[-2px] md:tracking-[-6px]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            There are no <br className="hidden md:block" /> terms and conditions <br className="hidden md:block" /> in our country.
          </h1>
        </BlurFade>
      </div>

    </div>
  );
}
