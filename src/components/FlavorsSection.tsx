'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const variants = [
  {
    name: 'Classic',
    desc: 'The original bold recipe. Perfectly balanced.',
    color: 'from-amber-900/40',
    bgColor: '#1c1511',
    image: 'classic.png',
    price: 125,
    details: 'Our signature Classic flavor is a masterclass in balance. We start with premium deep-roasted coffee beans, slowly cold-brewed for 24 hours to extract maximum flavor with zero bitterness. It is then carbonated and infused with our proprietary cola spice blend. The result is a crisp, deeply satisfying refreshment.'
  },
  {
    name: 'Black',
    desc: 'Extra dark, zero sugar. Pure intensity.',
    color: 'from-neutral-800/60',
    bgColor: '#111111',
    image: 'black.png',
    price: 135,
    details: 'For the purists. NOJO Black strips away all sugar and sweeteners, leaving only the pure, intense flavor of high-altitude espresso beans and stark, biting carbonation. It is our most caffeinated and unapologetically bold variant, designed to wake your senses with a profound chill.'
  },
  {
    name: 'Fat++',
    desc: 'Rich, creamy infusion for a smoother finish.',
    color: 'from-amber-700/40',
    bgColor: '#1f160d',
    image: 'fat++.png',
    price: 150,
    details: 'Conceived by our eccentric, subterranean artisan of mass, this decadent concoction is engineered with a singular purpose: aggressive, unapologetic expansion. Boasting a staggering 3,000 kilocalories per serving and an uncompromising 69% pure crystalline sugar content, Fat++ is not a beverage—it is a monumental tribute to pure excess.'
  },
  {
    name: 'Pink Chumt',
    desc: 'A subtle, elegant hint of wild berries.',
    color: 'from-pink-900/40',
    bgColor: '#1f0d14',
    image: 'Pink Chumt.png',
    price: 750,
    details: `It's 99.9% pure footbath of Elite Russian baddies and add 0.3 grams of pee.A true marvel of modern nutrition, this impossibly rare elixir boasts an astonishing 75 grams of pure protein per 100 grams.It is the pinnacle of esoteric refreshment—for those who demand the absolute peak of unapologetic luxury.`
  }
];

export default function FlavorsSection() {
  const [selectedVariant, setSelectedVariant] = useState<typeof variants[0] | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      email: formData.get('email'),
      location: formData.get('location'),
      variantName: selectedVariant?.name,
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Order submitted! Check your email for a confirmation.");
        setSelectedVariant(null);
        setShowCheckout(false);
      } else {
        const errorData = await response.json();
        alert("Error: " + (errorData.details || errorData.error || "Something went wrong. Please try again."));
      }
    } catch (error) {
      alert("Error submitting order. " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent scrolling on the body when modal is open
  if (typeof window !== 'undefined') {
    if (selectedVariant) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  return (
    <section id="variants" className="py-40 bg-neutral-950 relative border-t border-white/5 z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">The Collection</p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">Choose Your Chill</h2>
          </div>
          <button className="text-sm tracking-widest uppercase border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors">
            View All Varieties
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {variants.map((variant) => (
            <motion.div
              key={variant.name}
              layoutId={`card-${variant.name}`}
              onClick={() => setSelectedVariant(variant)}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl h-[28rem] flex flex-col justify-end overflow-hidden cursor-pointer"
            >
              {/* Image Background */}
              <motion.div className="absolute inset-0" layoutId={`image-${variant.name}`}>
                <Image
                  src={`/frames/flavors/${variant.image}`}
                  alt={`${variant.name} flavor`}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-w-768px) 100vw, 25vw"
                />
              </motion.div>

              {/* Hover Gradient Effect */}
              <motion.div
                layoutId={`gradient-${variant.name}`}
                className={`absolute inset-0 bg-gradient-to-t ${variant.color} via-black/40 to-black/80 opacity-90 group-hover:opacity-100 transition-opacity duration-700`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100" />

              <motion.div
                layoutId={`text-${variant.name}`}
                className="relative z-10 p-8 transform group-hover:-translate-y-4 transition-transform duration-500 ease-out"
              >
                <motion.h3 layoutId={`title-${variant.name}`} className="text-2xl font-medium mb-3">{variant.name}</motion.h3>
                <motion.p layoutId={`desc-${variant.name}`} className="text-neutral-400 font-light text-sm">{variant.desc}</motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apple-style Popup Modal */}
      <AnimatePresence>
        {selectedVariant && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedVariant(null); setShowCheckout(false); }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4 sm:p-6 md:p-12">
              <motion.div
                layoutId={`card-${selectedVariant.name}`}
                style={{ backgroundColor: selectedVariant.bgColor }}
                className="w-full max-w-5xl h-[80vh] md:h-[600px] rounded-3xl overflow-hidden flex flex-col md:flex-row pointer-events-auto relative shadow-2xl border border-white/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    if (showCheckout) setShowCheckout(false);
                    else { setSelectedVariant(null); setShowCheckout(false); }
                  }}
                  className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                  <motion.div className="absolute inset-0 w-full h-full" layoutId={`image-${selectedVariant.name}`}>
                    <Image
                      src={`/frames/flavors/${selectedVariant.image}`}
                      alt={`${selectedVariant.name} flavor`}
                      fill
                      className="object-cover"
                      sizes="(max-w-768px) 100vw, 50vw"
                    />
                  </motion.div>
                  <motion.div
                    layoutId={`gradient-${selectedVariant.name}`}
                    className={`absolute inset-0 bg-gradient-to-t ${selectedVariant.color} via-black/20 to-transparent opacity-80`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 md:hidden" />
                </div>

                {/* Right Side: Details or Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-b from-transparent to-black/50 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {!showCheckout ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col"
                      >
                        <motion.div layoutId={`text-${selectedVariant.name}`} className="relative z-10">
                          <motion.h3 layoutId={`title-${selectedVariant.name}`} className="text-4xl md:text-5xl font-medium mb-4 tracking-tight">{selectedVariant.name}</motion.h3>
                          <motion.p layoutId={`desc-${selectedVariant.name}`} className="text-neutral-300 font-light text-lg mb-8">{selectedVariant.desc}</motion.p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="space-y-8"
                        >
                          <p className="text-neutral-400 font-light leading-relaxed">
                            {selectedVariant.details}
                          </p>

                          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                            <button
                              onClick={() => setShowCheckout(true)}
                              className="px-8 py-3 bg-white text-black font-medium text-sm tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-colors"
                            >
                              Add to Cart
                            </button>
                            <span className="text-xl font-light tracking-widest">৳{selectedVariant.price}</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="checkout"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col space-y-6 w-full"
                      >
                        <h3 className="text-3xl font-medium mb-2 tracking-tight">Checkout</h3>
                        <form className="flex flex-col gap-4" onSubmit={handleCheckoutSubmit}>
                          <input name="name" type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" required />
                          <input name="contact" type="tel" placeholder="Contact Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" required />
                          <input name="email" type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" required />
                          <input name="location" type="text" placeholder="Location" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600" required />

                          <textarea
                            name="message"
                            placeholder="don't waste your time niqqa just hit it!"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm h-24 resize-none focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-500 italic"
                          />

                          <div className="pt-2">
                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black font-medium text-sm tracking-widest uppercase rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                              {isSubmitting ? 'Sending Order...' : 'Submit Order'}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
