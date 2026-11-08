import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Volume2, VolumeX, AlertCircle, Film, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const posterRef = useRef(null);

  // Text overlay refs for scroll orchestration
  const heroIntroRef = useRef(null);
  const stepOneRef = useRef(null);
  const stepTwoRef = useRef(null);
  const stepThreeRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressBarRef = useRef(null);

  // State management
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [assetNoticeDismissed, setAssetNoticeDismissed] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Primary video source and fallback paths
  const videoSrc = "/videos/hero.mp4";
  const posterSrc = "/images/hero-poster.webp";
  const posterFallback = "/images/hero.jpg";

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle Video Metadata Loaded
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      if (duration && !isNaN(duration) && duration > 0) {
        setVideoDuration(duration);
        setIsVideoLoaded(true);
        setVideoError(false);
      }
    }
  }, []);

  // Handle Video Error (Missing /videos/hero.mp4 or codec unsupported)
  const handleVideoError = useCallback(() => {
    console.warn(
      "[ScrollVideoHero] Video asset at '/videos/hero.mp4' could not be loaded or decoded. " +
      "Gracefully activating high-resolution poster fallback."
    );
    setVideoError(true);
    setIsVideoLoaded(false);
  }, []);

  // GSAP ScrollTrigger Synchronization
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    // Use gsap.context for complete cleanup upon unmount
    const ctx = gsap.context(() => {
      // Base setup for text elements
      gsap.set(heroIntroRef.current, { opacity: 1, y: 0 });
      gsap.set([stepOneRef.current, stepTwoRef.current, stepThreeRef.current], { 
        opacity: 0, 
        y: 40,
        pointerEvents: 'none'
      });

      // Target seeking cache to prevent redundant seeks
      let targetTime = 0;
      let isSeeking = false;
      let rafId = null;

      // Frame-sync helper using requestVideoFrameCallback if available
      const syncVideoFrame = () => {
        if (!video || !videoDuration || isNaN(videoDuration) || videoError) return;

        // Threshold check to avoid micro-seeking jitter (30ms delta)
        if (Math.abs(video.currentTime - targetTime) > 0.03 && !isSeeking) {
          isSeeking = true;
          video.currentTime = targetTime;
          
          if ('requestVideoFrameCallback' in video) {
            video.requestVideoFrameCallback(() => {
              isSeeking = false;
            });
          } else {
            // Fallback for browsers without requestVideoFrameCallback
            setTimeout(() => {
              isSeeking = false;
            }, 25);
          }
        }
      };

      // Main Cinematic Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: window.innerWidth < 768 ? '+=200%' : '+=320%',
          pin: true,
          scrub: 0.8, // Smooth scrub interpolation
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setCurrentProgress(p);

            // Update custom scroll progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${p})`;
            }

            // Sync video scrubbing only if motion is not reduced and video is operational
            if (!isReducedMotion && video && videoDuration > 0 && !videoError) {
              targetTime = p * videoDuration;
              if (rafId) cancelAnimationFrame(rafId);
              rafId = requestAnimationFrame(syncVideoFrame);
            }
          }
        }
      });

      // Subtle atmospheric poster zoom if video is static or fallback active
      if (posterRef.current) {
        tl.to(posterRef.current, {
          scale: 1.08,
          ease: 'none',
          duration: 1
        }, 0);
      }

      // Phase 1: Fade out initial Hero Headline (0% -> 22%)
      tl.to(heroIntroRef.current, {
        opacity: 0,
        y: -30,
        ease: 'power2.in',
        duration: 0.22
      }, 0.02);

      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.1
      }, 0.05);

      // Phase 2: Editorial Message 1 (24% -> 46%)
      tl.to(stepOneRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.12,
        pointerEvents: 'auto'
      }, 0.24)
      .to(stepOneRef.current, {
        opacity: 0,
        y: -25,
        ease: 'power2.in',
        duration: 0.10,
        pointerEvents: 'none'
      }, 0.42);

      // Phase 3: Editorial Message 2 (48% -> 70%)
      tl.to(stepTwoRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.12,
        pointerEvents: 'auto'
      }, 0.48)
      .to(stepTwoRef.current, {
        opacity: 0,
        y: -25,
        ease: 'power2.in',
        duration: 0.10,
        pointerEvents: 'none'
      }, 0.66);

      // Phase 4: Editorial Message 3 (72% -> 96%)
      tl.to(stepThreeRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.14,
        pointerEvents: 'auto'
      }, 0.72)
      .to(stepThreeRef.current, {
        opacity: 0.15,
        y: -15,
        ease: 'power2.in',
        duration: 0.12
      }, 0.90);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [videoDuration, videoError, isReducedMotion]);

  // Toggle Mute Audio if user desires ambient track
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section 
      id="top"
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-charcoal select-none"
      aria-label="Cinematic Interior Architecture Experience"
    >
      {/* Background Media Container (Landscape 16:9 responsive crop) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-charcoal">
        {/* Poster Image / Fallback Layer */}
        <img
          ref={posterRef}
          src={posterSrc}
          onError={(e) => {
            // Graceful fallback to hero.jpg if hero-poster.webp isn't available
            if (e.target.src !== posterFallback) {
              e.target.src = posterFallback;
            }
          }}
          alt="Architectural luxury interior film backdrop"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded && !videoError ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          loading="eager"
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted={isMuted}
          playsInline
          autoPlay={false}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            isVideoLoaded && !videoError ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />

        {/* Cinematic Translucent Vignette & Dark Gradients for Editorial Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal/20 to-charcoal/80 pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      </div>

      {/* Progress Line Bar at Bottom of Video Frame */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 pointer-events-none">
        <div 
          ref={progressBarRef} 
          className="h-full bg-bronze origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${currentProgress})` }}
        />
      </div>

      {/* Top Floating Badges / Controls */}
      <div className="absolute top-24 left-6 md:left-12 right-6 md:right-12 z-20 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 bg-charcoal/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full">
          <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
          <span className="text-[10px] tracking-widest uppercase text-warmWhite/80 font-mono">
            {videoError ? 'Editorial Photographic Sequence' : 'Scroll-Controlled 4K Film'}
          </span>
        </div>

        {isVideoLoaded && !videoError && (
          <button
            onClick={toggleMute}
            className="pointer-events-auto p-2.5 rounded-full bg-charcoal/80 backdrop-blur-md border border-white/10 text-warmWhite hover:text-bronze hover:border-bronze transition-colors focus:outline-none"
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-bronze" />}
          </button>
        )}
      </div>

      {/* Overlaid Editorial Content Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center">
        
        {/* State A: Initial Viewport (Spaces That Tell Stories) */}
        <div 
          ref={heroIntroRef}
          className="max-w-4xl mx-auto flex flex-col items-center will-change-transform"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-bronze/60" />
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-bronze font-medium">
              Interior Architecture / Design Studio
            </span>
            <span className="h-[1px] w-8 bg-bronze/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-warmWhite font-light leading-[1.08] mb-8">
            SPACES THAT <br />
            <span className="italic font-normal text-bronze-light">TELL STORIES.</span>
          </h1>

          <p className="max-w-xl text-base md:text-lg text-warmWhite/80 font-light tracking-wide leading-relaxed">
            Thoughtfully designed interiors. Timeless experiences.
          </p>

          <div className="mt-8 flex items-center gap-4 text-xs tracking-widest text-warmWhite/60 uppercase">
            <span className="font-mono text-bronze">01</span>
            <span>Architectural Poise</span>
            <span className="w-1 h-1 rounded-full bg-warmWhite/30" />
            <span className="font-mono text-bronze">02</span>
            <span>Sensory Materiality</span>
          </div>
        </div>

        {/* State B: Step 1 (Where Proportion Honors Light) */}
        <div 
          ref={stepOneRef}
          className="absolute max-w-3xl mx-auto px-6 flex flex-col items-center will-change-transform"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-bronze font-mono mb-4">
            Movement I &middot; Spatial Rhythm
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight leading-tight mb-6">
            WHERE PROPORTION <br />
            <span className="italic text-bronze-light">HONORS LIGHT.</span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-warmWhite/80 font-light leading-relaxed">
            Every room is orchestrated as an unfolding architectural dialogue between sculpted mass and morning daylight.
          </p>
        </div>

        {/* State C: Step 2 (Tactile Materiality & Silence) */}
        <div 
          ref={stepTwoRef}
          className="absolute max-w-3xl mx-auto px-6 flex flex-col items-center will-change-transform"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-bronze font-mono mb-4">
            Movement II &middot; Tactile Silence
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight leading-tight mb-6">
            ORGANIC TEXTURES <br />
            <span className="italic text-bronze-light">CRAFTED BY HAND.</span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-warmWhite/80 font-light leading-relaxed">
            Smoked European oak, honed Roman travertine, and patinated bronze—materials that ground spatial luxury in authenticity.
          </p>
        </div>

        {/* State D: Step 3 (Designed to be Inhabited) */}
        <div 
          ref={stepThreeRef}
          className="absolute max-w-3xl mx-auto px-6 flex flex-col items-center will-change-transform"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-bronze font-mono mb-4">
            Movement III &middot; The Residence
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight leading-tight mb-6">
            ARCHITECTURE DESIGNED <br />
            <span className="italic text-bronze-light">TO BE INHABITED.</span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-warmWhite/80 font-light leading-relaxed">
            Quiet sanctuaries built to withstand fleeting trends, evolving gracefully with the families who occupy them.
          </p>
        </div>

      </div>

      {/* Initial Bottom Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-warmWhite/60 mb-3 font-medium">
          Scroll to explore film
        </span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-bronze animate-bounce" />
        </div>
      </div>

      {/* Developer Asset Notice (Graceful Fallback Guidance) */}
      {videoError && !assetNoticeDismissed && (
        <aside 
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 max-w-sm bg-charcoal-dark/95 border border-bronze/40 p-4 shadow-2xl backdrop-blur-md rounded-none text-left"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <Film className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-bronze">
                  Developer Video Notice
                </h3>
                <button
                  onClick={() => setAssetNoticeDismissed(true)}
                  className="text-[11px] text-warmGray hover:text-warmWhite uppercase tracking-wider"
                  aria-label="Dismiss notice"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-[11px] text-warmWhite/80 leading-relaxed mb-2">
                The Google Flow video at <code className="text-bronze bg-charcoal px-1 py-0.5 font-mono">/videos/hero.mp4</code> is ready to be linked. 
                The site is currently presenting the high-resolution photographic fallback.
              </p>
              <div className="text-[10px] text-warmGray font-mono bg-charcoal p-2 border border-white/5">
                Recommended encoding: H.264 (intra-frame GOP 1) for instantaneous frame scrub.
              </div>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
