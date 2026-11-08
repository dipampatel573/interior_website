import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';
import { X, Check, Compass, Ruler, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const articles = container.querySelectorAll('article');
      articles.forEach((art) => {
        gsap.fromTo(
          art,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: art,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative bg-charcoal text-warmWhite py-28 md:py-40 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-bronze" />
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-bronze font-mono">
                Selected Works &middot; Architectural Portfolio
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warmWhite font-light tracking-tight">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-warmWhite/70 font-light leading-relaxed">
            A curated index of bespoke private residences, penthouses, and spatial transformations designed with timeless restraint.
          </p>
        </div>

        {/* Project Cards Sequence */}
        <div className="flex flex-col space-y-24 md:space-y-36">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal-dark/95 backdrop-blur-md animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-charcoal border border-white/10 shadow-2xl p-6 sm:p-10 text-warmWhite">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-warmWhite/80 hover:text-bronze hover:border-bronze transition-colors focus:outline-none"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-mono tracking-widest text-bronze uppercase">
                {selectedProject.category} &middot; {selectedProject.year}
              </span>
              <h3 
                id="modal-project-title"
                className="font-serif text-3xl sm:text-5xl text-warmWhite font-light mt-2"
              >
                {selectedProject.title}
              </h3>
              <p className="text-sm text-bronze uppercase tracking-widest mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Modal Image */}
            <div className="aspect-[16/9] w-full overflow-hidden mb-8 border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Body & Specs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
              <div className="md:col-span-7 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-bronze font-mono">
                  Architectural Narrative
                </h4>
                <p className="text-warmWhite/80 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
                <div className="p-4 bg-white/5 border-l-2 border-bronze text-xs text-warmWhite/90 leading-relaxed">
                  <strong className="block text-bronze uppercase tracking-wider text-[10px] mb-1">
                    Design Approach
                  </strong>
                  {selectedProject.approach}
                </div>
              </div>

              <div className="md:col-span-5 space-y-6 bg-charcoal-light/60 p-6 border border-white/5">
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-bronze font-mono mb-3">
                    Project Specifications
                  </h4>
                  <dl className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <dt className="text-warmWhite/60">Scope:</dt>
                      <dd className="text-warmWhite font-light text-right">{selectedProject.specs.scope}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <dt className="text-warmWhite/60">Scale:</dt>
                      <dd className="text-warmWhite font-light">{selectedProject.dimensions}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <dt className="text-warmWhite/60">Timeline:</dt>
                      <dd className="text-warmWhite font-light">{selectedProject.specs.timeline}</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <dt className="text-warmWhite/60">Palette:</dt>
                      <dd className="text-warmWhite font-light text-right">{selectedProject.specs.palette}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-bronze font-mono mb-2">
                    Primary Materials
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.materials.map((m, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/10 text-warmWhite/80">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-bronze text-charcoal font-medium text-xs tracking-widest uppercase hover:bg-bronze-light transition-colors"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
