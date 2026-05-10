import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function CinematicHeroDemo() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen">
      <CinematicHero 
        brandName="NOJO"
        tagline1="Elevate your taste,"
        tagline2="unlimited nojo."
        cardHeading="The Elixir of the Elite."
        cardDescription={<>Experience <span className="text-white font-semibold">NOJO</span>, the premium cola designed for those who demand the finest. Scroll to discover the journey of flavor and exclusivity.</>}
        ctaHeading="Join the Elite."
        ctaDescription="Follow our journey and unlock unlimited access to the world of NOJO."
      />
    </main>
  );
}
