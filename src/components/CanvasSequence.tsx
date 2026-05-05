'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImagePreloader } from '@/hooks/useImagePreloader';

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
  frameCount: number;
  folderPath: string;
  prefix: string;
}

export default function CanvasSequence({ frameCount, folderPath, prefix }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { images, progress, isLoaded } = useImagePreloader(frameCount, folderPath, prefix);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrame);
    };

    // Render a specific frame
    const renderFrame = (index: number) => {
      if (images[index]) {
        const img = images[index];
        // Calculate dimensions to cover the canvas (object-fit: cover equivalent)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Add a subtle dark overlay for better text readability
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Create GSAP ScrollTrigger for the sequence — scoped so cleanup
    // only kills this component's triggers, not the footer's.
    const frameObj = { frame: 0 };
    const ctx = gsap.context(() => {
      gsap.to(frameObj, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
        onUpdate: () => {
          const frameIndex = Math.round(frameObj.frame);
          setCurrentFrame(frameIndex);
          renderFrame(frameIndex);
        }
      });

      // Text animation
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -50,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '15% top',
            scrub: 1,
          }
        });
      }
    }, containerRef);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      ctx.revert(); // Only kills triggers created inside this context
    };
  }, [isLoaded, images, frameCount, currentFrame]);

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
        <div className="text-sm font-light uppercase tracking-widest mb-4">Loading NOJO</div>
        <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6 uppercase drop-shadow-2xl">
            First Time In Nigatola
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 font-light mb-10 max-w-xl mx-auto drop-shadow-xl">
            Experience the ultimate cold cola splash. Pure, crisp, and dramatically refreshing.
          </p>
          <a href="#product" className="px-8 py-4 bg-white text-black font-medium text-sm tracking-wide rounded-full hover:bg-neutral-200 transition-colors duration-300">
            Experience NOJO
          </a>
        </div>
      </div>
    </div>
  );
}
