import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";
import { CinematicFooter } from "@/components/motion-footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function HorizonDemo() {
  return (
    <SmoothScroll>
      <main className="bg-black text-white">
        <HorizonHeroSection />
        
        {/* Spacer to allow scrolling before the footer if needed, 
            though HorizonHeroSection itself provides 300vh height */}
        
        <CinematicFooter />
      </main>
    </SmoothScroll>
  );
}
