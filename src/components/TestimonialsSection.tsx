'use client';

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Ei bainchod amar tk mere dise.",
    image: "/testimonials/ehsanul-haque-milon-170226-1771310715.jpg",
    name: "Kailla Milon",
    role: "Biddya Chor",
  },
  {
    text: "halare tk dilam amare ekhono ghurai",
    image: "/testimonials/dealer zakir.jpg",
    name: "Dealer Zakir",
    role: "Chandabaj",
  },
  {
    text: "The support team is exceptional, because they dont have supports team",
    image: "/testimonials/namrud joy.jpg",
    name: "Namrud Joy",
    role: "MIT Scientist",
  },
  {
    text: "amar ganja khawar tk loiya gesega",
    image: "/testimonials/bongoboltu.jpg",
    name: "Bongoboltu",
    role: "CEO of BANGLADESH",
  },
  {
    text: "kire vai nojo'r taste amar mut er moto kn?",
    image: "/testimonials/kawwa kader.jpg",
    name: "Kawwa kader",
    role: "tokai leader",
  },
  {
    text: "baje product.",
    image: "/testimonials/chuppu.jpg",
    name: "Chuppu",
    role: "Bekar",
  },
  {
    text: "product ta dhon chilo but where is my 10% ?.",
    image: "/testimonials/khamba tarek.jpg",
    name: "Khamba tarek",
    role: "Khamba Chor",
  },
  {
    text: "ami bottle mukh ditei dekhi arafat er sperm er smell.",
    image: "/testimonials/zaima rahman.jpg",
    name: "Zaima Rahman",
    role: "Khamba Konna",
  },
  {
    text: "cdi baeee",
    image: "/testimonials/Mirza_Abbas.jpg",
    name: "Mirza Abbas",
    role: "Burkha Leader",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section className="bg-black my-40 relative z-20 border-t border-white/5 py-32">
      <div className="container z-10 mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 border border-white/10 py-2 px-6 rounded-full">
              The Verdict
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-5">
            What they say
          </h2>
          <p className="text-center mt-6 text-neutral-400 font-light text-lg">
            Our most devoted consumers speak their truth. Read the unvarnished opinions of those who have experienced NOJO.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
