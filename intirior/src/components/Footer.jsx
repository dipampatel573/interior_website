import React from 'react';
import { ArrowUp, Instagram, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-dark border-t border-white/10 text-warmWhite py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-bronze flex items-center justify-center">
                <span className="text-[10px] tracking-tighter text-bronze font-serif">A</span>
              </div>
              <span className="font-display tracking-[0.25em] text-lg font-semibold uppercase text-warmWhite">
                Aurelia Studio
              </span>
            </div>
            <p className="text-xs md:text-sm text-warmWhite/60 font-light max-w-sm leading-relaxed">
              Spatial architecture and interior design studio crafting timeless private environments across global residences and private estates.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-bronze block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-warmWhite/70">
              <li><a href="#top" className="hover:text-bronze transition-colors">Film Experience</a></li>
              <li><a href="#studio" className="hover:text-bronze transition-colors">Studio</a></li>
              <li><a href="#projects" className="hover:text-bronze transition-colors">Projects</a></li>
              <li><a href="#philosophy" className="hover:text-bronze transition-colors">Philosophy</a></li>
              <li><a href="#services" className="hover:text-bronze transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-bronze transition-colors">Inquiries</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-bronze block">
              Practice Locations
            </span>
            <div className="space-y-3 text-xs text-warmWhite/70 font-light">
              <div>
                <strong className="text-warmWhite font-medium block">San Francisco</strong>
                <span>Heritage Design District &middot; Suite 402</span>
              </div>
              <div>
                <strong className="text-warmWhite font-medium block">London</strong>
                <span>Mayfair Architectural Atelier</span>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs tracking-widest uppercase text-warmWhite/70 hover:text-bronze transition-colors p-2 border border-white/10 hover:border-bronze"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
            <span className="text-[10px] font-mono text-warmWhite/40 uppercase tracking-widest mt-8 md:mt-0">
              EST. MMXXIV
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-warmWhite/50 font-mono tracking-wider gap-4">
          <div>
            &copy; {new Date().getFullYear()} AURELIA ARCHITECTURAL STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>Portfolio Demo Case Studies</span>
            <span>&middot;</span>
            <a href="#contact" className="hover:text-bronze transition-colors">Privacy & Provenance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
