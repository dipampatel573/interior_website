import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioPhilosophy } from '../data/projects';
import { Gem, TreePine, Sun, Sparkles, Feather } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const imageColRef = useRef(null);
  const textColRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on the materials photography
      gsap.to(imageColRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      // Staggered reveal for philosophy manifesto and material breakdown
      gsap.fromTo(
        section.querySelectorAll('.reveal-card'),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const materialIcons = [
    <Gem className="w-5 h-5 text-bronze" key="stone" />,
    <TreePine className="w-5 h-5 text-bronze" key="timber" />,
    <Sparkles className="w-5 h-5 text-bronze" key="metal" />,
    <Feather className="w-5 h-5 text-bronze" key="textile" />
  ];

  return (
    <section 
      id="philosophy"
      ref={sectionRef} 
      className="relative bg-charcoal-dark text-warmWhite py-28 md:py-44 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-bronze" />
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-bronze font-mono">
              Material Provenance &middot; Craftsmanship
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight leading-tight">
            TIMELESS MATERIALS. <br />
            <span className="italic text-bronze-light">INTENTIONAL SPACES.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-warmWhite/75 font-light leading-relaxed">
            {studioPhilosophy.subheadline}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Image with subtle parallax & editorial quote */}
          <div 
            ref={imageColRef}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/matiral.jpg"
                alt="Tactile architectural material palette: honed stone, walnut wood, raw linen, and patinated brass"
                loading="lazy"
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-charcoal/90 backdrop-blur-md border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-bronze block mb-1">
                  Tactile Honesty
                </span>
                <p className="text-xs text-warmWhite/80 italic font-serif">
                  &ldquo;A material should speak truthfully of its origin—unburdened by synthetic laminates.&rdquo;
                </p>
              </div>
            </div>

            {/* Architectural note box */}
            <div className="mt-8 p-6 bg-charcoal border border-white/5 space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-mono text-warmWhite/50 block">
                Circadian Lighting Scenography
              </span>
              <p className="text-xs text-warmWhite/70 font-light leading-relaxed">
                Light is our primary building material. We sculpt spaces so that indirect perimeter reveals wash natural limestone, creating tranquil gradients of luminosity as daylight transitions into evening dusk.
              </p>
            </div>
          </div>

          {/* Right Column: Manifesto and 4 Core Materials */}
          <div 
            ref={textColRef}
            className="lg:col-span-7 flex flex-col space-y-10"
          >
            {/* Manifesto Excerpts */}
            <div className="reveal-card space-y-4 text-sm sm:text-base text-warmWhite/80 font-light leading-relaxed">
              {studioPhilosophy.manifesto.map((paragraph, idx) => (
                <p key={idx} className="border-l-2 border-white/15 pl-6 py-1">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Material Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {studioPhilosophy.materials.map((mat, index) => (
                <div 
                  key={mat.name} 
                  className="reveal-card p-6 bg-charcoal border border-white/5 hover:border-bronze/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 bg-white/5 group-hover:bg-bronze/10 transition-colors">
                      {materialIcons[index]}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-bronze uppercase">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-warmWhite font-light group-hover:text-bronze transition-colors mb-1">
                    {mat.name}
                  </h3>
                  <span className="text-[11px] font-mono tracking-wider text-warmWhite/50 block mb-3">
                    {mat.origin}
                  </span>
                  <p className="text-xs text-warmWhite/70 font-light leading-relaxed">
                    {mat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
