import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioServices } from '../data/projects';
import { Plus, Minus, ArrowUpRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const [expandedService, setExpandedService] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.service-row'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section 
      id="services"
      ref={sectionRef} 
      className="relative bg-charcoal text-warmWhite py-28 md:py-44 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-bronze" />
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-bronze font-mono">
                Scope & Practice &middot; Studio Aurelia
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight">
              STUDIO SERVICES
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-warmWhite/70 font-light leading-relaxed">
            From comprehensive structural interior architecture to precise acoustic lighting scenography, each commission is executed with obsessive precision.
          </p>
        </div>

        {/* Services Editorial List */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {studioServices.map((service) => {
            const isExpanded = expandedService === service.id;

            return (
              <div 
                key={service.id}
                className="service-row group transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div 
                  className="py-8 md:py-12 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                  onClick={() => toggleService(service.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleService(service.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  {/* Left: Number and Title */}
                  <div className="flex items-start md:items-center gap-6 md:gap-12">
                    <span className="font-mono text-xs md:text-sm tracking-widest text-bronze uppercase shrink-0 pt-1 md:pt-0">
                      {service.id}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warmWhite font-light group-hover:text-bronze transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-warmWhite/50 mt-1">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Brief preview & expand toggle */}
                  <div className="flex items-center justify-between md:justify-end gap-8 pl-12 md:pl-0">
                    <span className="text-xs text-warmWhite/60 hidden lg:inline max-w-xs text-right truncate">
                      {service.description}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-warmWhite/80 group-hover:border-bronze group-hover:text-bronze transition-colors">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Tray */}
                {isExpanded && (
                  <div className="pl-12 md:pl-24 pb-8 md:pb-12 text-sm text-warmWhite/80 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-white/5">
                      <div className="md:col-span-7">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-bronze mb-2">
                          Methodology & Scope
                        </h4>
                        <p className="font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="md:col-span-5">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-bronze mb-3">
                          Key Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-warmWhite/75">
                              <span className="w-1.5 h-1.5 rounded-full bg-bronze shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Commission Prompt */}
        <div className="mt-16 p-8 bg-charcoal-light/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl text-warmWhite font-light">
              Looking for a custom cross-disciplinary commission?
            </h4>
            <p className="text-xs text-warmWhite/60 mt-1">
              We frequently take on private residences requiring end-to-end architecture, joinery, and art advisory.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-6 py-3 bg-bronze text-charcoal font-medium hover:bg-bronze-light transition-colors shrink-0"
          >
            <span>Request Studio Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
