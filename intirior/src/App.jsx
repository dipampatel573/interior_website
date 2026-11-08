import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import ScrollVideoHero from './components/ScrollVideoHero';
import StudioIntro from './components/StudioIntro';
import Projects from './components/Projects';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger so that scroll calculations stay in 1:1 sync
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis updates through GSAP's high-precision internal ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable GSAP lag smoothing to maintain fluid frame sync with video scrubbing
    gsap.ticker.lagSmoothing(0);

    // Recalculate ScrollTrigger on load and resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-warmWhite font-sans antialiased selection:bg-bronze selection:text-charcoal relative">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* Main Experience: Scroll-Controlled Cinematic Hero */}
        <ScrollVideoHero />

        {/* Section A: Studio Introduction */}
        <StudioIntro />

        {/* Section B: Featured Projects */}
        <Projects />

        {/* Section C: Design Philosophy */}
        <Philosophy />

        {/* Section D: Services */}
        <Services />

        {/* Section E: Contact */}
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
