import React from 'react';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';

export default function ProjectCard({ project, index, onSelectProject }) {
  const isEven = index % 2 === 1;

  return (
    <article 
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
        isEven ? 'lg:grid-flow-dense' : ''
      }`}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Project Image Column */}
      <div 
        className={`lg:col-span-7 group cursor-pointer overflow-hidden ${
          isEven ? 'lg:col-start-6' : 'lg:col-start-1'
        }`}
        onClick={() => onSelectProject(project)}
      >
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-charcoal-light border border-white/5">
          <img
            src={project.image}
            alt={project.alt || project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors duration-500" />
          
          {/* Subtle Demo Badge */}
          {project.isDemo && (
            <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-mono tracking-widest uppercase text-warmWhite/75">
              Portfolio Concept Case Study
            </div>
          )}

          {/* Quick Click CTA Pill */}
          <div className="absolute bottom-4 right-4 bg-charcoal/85 backdrop-blur-md px-3.5 py-2 border border-white/10 flex items-center gap-2 text-xs tracking-wider uppercase text-warmWhite group-hover:bg-bronze group-hover:text-charcoal transition-all duration-300">
            <span>View Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Project Editorial Information Column */}
      <div 
        className={`lg:col-span-5 flex flex-col justify-center space-y-5 ${
          isEven ? 'lg:col-start-1' : 'lg:col-start-8'
        }`}
      >
        {/* Number & Category */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-mono text-xs tracking-widest text-bronze uppercase">
            Case Study 0{index + 1}
          </span>
          <span className="text-xs tracking-wider uppercase text-warmWhite/60">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          id={`project-title-${project.id}`}
          className="font-serif text-2xl sm:text-4xl text-warmWhite font-light tracking-tight hover:text-bronze transition-colors cursor-pointer"
          onClick={() => onSelectProject(project)}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs uppercase tracking-widest text-bronze font-medium">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-warmWhite/75 font-light leading-relaxed">
          {project.description}
        </p>

        {/* Approach Note */}
        <div className="p-4 bg-charcoal-light/50 border-l-2 border-bronze text-xs text-warmWhite/80 leading-relaxed font-light">
          <strong className="font-medium text-warmWhite block mb-1 uppercase tracking-wider text-[10px]">
            Design Approach & Tectonics
          </strong>
          {project.approach}
        </div>

        {/* Material Tags */}
        <div className="pt-2">
          <span className="text-[10px] uppercase tracking-widest text-warmWhite/50 block mb-2 font-mono flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-bronze" /> Curated Materials
          </span>
          <div className="flex flex-wrap gap-2">
            {project.materials.map((mat, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 text-warmWhite/80 tracking-wide rounded-none"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-3">
          <button
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bronze hover:text-bronze-light font-medium group focus:outline-none"
          >
            <span>Read Spatial Case Study</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>
      </div>
    </article>
  );
}
