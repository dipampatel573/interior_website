import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Studio', href: '#studio' },
    { label: 'Projects', href: '#projects' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-charcoal/90 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' 
          : 'bg-gradient-to-b from-charcoal/80 to-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Identity */}
        <a 
          href="#top" 
          onClick={(e) => handleLinkClick(e, '#top')}
          className="group flex items-center gap-3 text-warmWhite focus:outline-none focus:ring-1 focus:ring-bronze"
        >
          <div className="w-7 h-7 border border-bronze flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
            <span className="text-[10px] tracking-tighter text-bronze font-serif font-light">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-[0.25em] text-sm md:text-base font-semibold uppercase text-warmWhite">
              Aurelia
            </span>
            <span className="text-[9px] tracking-widest text-warmGray uppercase hidden sm:block">
              Architecture & Interiors
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs tracking-widest uppercase text-warmWhite/75 hover:text-bronze transition-colors duration-300 relative py-1 focus:outline-none focus:text-bronze"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bronze transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Inquire Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="group flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2.5 border border-bronze/50 hover:border-bronze hover:bg-bronze hover:text-charcoal transition-all duration-300 text-warmWhite"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-warmWhite p-2 focus:outline-none focus:ring-1 focus:ring-bronze"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-bronze" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[100%] bg-charcoal-dark border-b border-white/10 px-8 py-10 flex flex-col space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm tracking-widest uppercase text-warmWhite hover:text-bronze transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="flex items-center justify-between text-xs tracking-widest uppercase py-3 px-4 bg-bronze text-charcoal font-medium text-center"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
