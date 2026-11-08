import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Layers, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StudioIntro() {
  const sectionRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Masked headline reveals with stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power3.out'
        }
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        statsRef.current ? statsRef.current.children : [],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="studio"
      ref={sectionRef} 
      className="relative bg-charcoal text-warmWhite py-28 md:py-44 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Studio Subheading */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-[1px] bg-bronze" />
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-bronze font-mono">
            Architectural Philosophy &middot; Studio Aurelia
          </span>
        </div>

        {/* Masked Headline Stagger */}
        <div className="mb-14 md:mb-20 overflow-hidden">
          <div className="overflow-hidden py-1">
            <h2 
              ref={headlineLine1Ref}
              className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-warmWhite will-change-transform"
            >
              DESIGN IS HOW A SPACE
            </h2>
          </div>
          <div className="overflow-hidden py-1">
            <h2 
              ref={headlineLine2Ref}
              className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light italic tracking-tight leading-[1.08] text-bronze-light will-change-transform"
            >
              MAKES YOU FEEL.
            </h2>
          </div>
        </div>

        {/* Editorial Split Narrative */}
        <div 
          ref={paragraphRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start pb-16 md:pb-24 border-b border-white/10"
        >
          <div className="md:col-span-5">
            <p className="text-lg md:text-xl font-light text-warmWhite leading-relaxed">
              We do not impose arbitrary styles onto structures. Instead, we listen to the acoustic cadence of the architecture, the sun&rsquo;s natural transit, and the rituals of the people who inhabit it.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col space-y-6 text-sm md:text-base font-light text-warmWhite/70 leading-relaxed">
            <p>
              Founded on the belief that true luxury is distilled simplicity, Aurelia creates bespoke private residences, penthouses, and architectural sanctuaries. Our methodology combines rigorous spatial sequencing with master-grade natural materiality.
            </p>
            <p>
              By paring away superfluous ornamentation, our spaces evoke an atmosphere of enduring quietude—where shadow gaps replace heavy trims, tactile finishes welcome touch, and every sightline is deliberately framed.
            </p>
          </div>
        </div>

        {/* Studio Pillars / Key Architectural Figures */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-16"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-bronze mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase font-mono">Disciplines</span>
            </div>
            <span className="font-serif text-3xl md:text-4xl text-warmWhite font-normal">Architecture</span>
            <span className="text-xs text-warmWhite/60 font-light">From spatial planning to bespoke interior millwork</span>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-bronze mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase font-mono">Materiality</span>
            </div>
            <span className="font-serif text-3xl md:text-4xl text-warmWhite font-normal">Authentic</span>
            <span className="text-xs text-warmWhite/60 font-light">Zero synthetic veneers; pure stone, timber & linen</span>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-bronze mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase font-mono">Scenography</span>
            </div>
            <span className="font-serif text-3xl md:text-4xl text-warmWhite font-normal">Circadian</span>
            <span className="text-xs text-warmWhite/60 font-light">Low-glare architectural lighting calibrated to the sun</span>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-bronze mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase font-mono">Longevity</span>
            </div>
            <span className="font-serif text-3xl md:text-4xl text-warmWhite font-normal">Generational</span>
            <span className="text-xs text-warmWhite/60 font-light">Designed to age with grace, dignity, and natural patina</span>
          </div>
        </div>
      </div>
    </section>
  );
}
