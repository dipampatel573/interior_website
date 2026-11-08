/**
 * Centralized Project Case Studies Data
 * 
 * NOTE: The data below represents sample / demo architectural case studies.
 * Images are served locally from public/images/ using the client's curated photography.
 * Real locations, verified measurements, and client data are intentionally transparent.
 */

export const projectsData = [
  {
    id: "proj-01",
    isDemo: true,
    title: "Contemporary Residence",
    category: "Residential Architecture & Interior",
    year: "2024",
    image: "/images/bedroom.jpg",
    alt: "Contemporary master bedroom with custom fluted paneling and ambient architectural lighting",
    tagline: "Serene proportions and monolithic architectural calm",
    description: "An intentional study in tactile minimalism. The residence balances oversized floor-to-ceiling volumes with intimate sanctuaries of quiet comfort. Custom timber acoustics, integrated perimeter reveals, and concealed flush door systems ensure unobstructed visual horizons throughout the private quarters.",
    location: "Studio Portfolio Case Study", // verified demo tag
    approach: "Biophilic daylight optimization paired with soft acoustic textures and recessed low-glare architectural illumination.",
    materials: [
      "Smoked European Oak",
      "Honed Travertine",
      "Brushed Unlacquered Brass",
      "Belgian Raw Linen"
    ],
    dimensions: "4,200 sq. ft.",
    specs: {
      scope: "Full Interior Architecture, Bespoke Furniture & Lighting Curation",
      timeline: "14 Months Concept to Realization",
      palette: "Earth neutrals, warm stone, deep charcoal accents"
    }
  },
  {
    id: "proj-02",
    isDemo: true,
    title: "Modern Luxury Apartment",
    category: "High-Rise Penthouse Renovation",
    year: "2024",
    image: "/images/close.jpg",
    alt: "Architectural detail of bespoke joinery, fluted glass, and sculptural lighting",
    tagline: "Precision joinery meets curated materiality",
    description: "Reimagined from an open shell into a sequential spatial progression. Every threshold functions as a deliberate transition framed by continuous walnut portal reveals. Architectural storage dissolves into wall planes, spotlighting bespoke craftsmanship and hand-finished bronze hardware.",
    location: "Urban Center Demo Case Study",
    approach: "Spatial zoning via floating volume dividers rather than rigid partitions, maintaining 360-degree daylight penetration.",
    materials: [
      "American Walnut Joinery",
      "Ceppo di Gré Stone",
      "Hand-finished Patinated Bronze",
      "Micro-cement Flooring"
    ],
    dimensions: "2,850 sq. ft.",
    specs: {
      scope: "Architectural Redesign, Bespoke Millwork & Audio-Visual Integration",
      timeline: "10 Months",
      palette: "Warm umber, charcoal graphite, muted champagne"
    }
  },
  {
    id: "proj-03",
    isDemo: true,
    title: "Minimalist Living Space",
    category: "Curated Living & Gallery Hall",
    year: "2023",
    image: "/images/galary.jpg",
    alt: "Double-height minimalist gallery living space with sculptural furniture and neutral tones",
    tagline: "A gallery of natural light and sculptured space",
    description: "Designed for a discerning collector, this living pavilion elevates spatial geometry into an immersive sculptural canvas. Shadow gaps replace traditional baseboards, while continuous lime plaster walls diffuse fluctuating sunlight throughout the day.",
    location: "Studio Archive Demo Study",
    approach: "Reduction of ornamentation to emphasize tectonic authenticity, natural material patina, and shadow play.",
    materials: [
      "Natural Roman Stucco",
      "Nero Marquina & Calacatta Marble",
      "Cast Bronze Sculptural Accents",
      "Woven Wool & Silk Bouclé"
    ],
    dimensions: "3,600 sq. ft.",
    specs: {
      scope: "Spatial Planning, Lighting Scenography & Custom Furniture",
      timeline: "12 Months",
      palette: "Alabaster white, honed gray marble, deep walnut"
    }
  }
];

export const studioPhilosophy = {
  headline: "TIMELESS MATERIALS. INTENTIONAL SPACES.",
  subheadline: "We reject fleeting trends in favor of enduring architectural poise.",
  manifesto: [
    "Architecture is felt before it is understood. The weight of a solid timber door, the cooling touch of honed travertine underfoot, the slow drift of sunlight across textured lime plaster—these sensory dialogues shape how human beings inhabit space.",
    "Our studio operates at the intersection of architectural discipline and sensory richness. By paring down ornamentation to its essential tectonic expression, we craft environments that evoke calm, focus, and quiet grandeur."
  ],
  materials: [
    {
      name: "Natural Stone",
      origin: "Honed Roman Travertine & Calacatta",
      description: "Organic veining and tactile temperature shifts ground living spaces in authentic geological time.",
      image: "/images/matiral.jpg"
    },
    {
      name: "Architectural Timber",
      origin: "Smoked American Walnut & White Oak",
      description: "Precision-milled grains offering acoustic warmth, visual depth, and natural patina that ennobles with age."
    },
    {
      name: "Living Metals",
      origin: "Hand-patinated Bronze & Gunmetal",
      description: "Tactile touchpoints that gracefully register human contact without artificial lacquer barriers."
    },
    {
      name: "Textile Craft",
      origin: "Raw Belgian Linen & Bouclé",
      description: "Soft acoustic absorption and dimensional softness juxtaposing structural stone geometry."
    }
  ]
};

export const studioServices = [
  {
    id: "01",
    title: "Interior Architecture",
    subtitle: "Complete Spatial Transformation",
    description: "Holistic structural reconfiguration, spatial sequencing, threshold design, and bespoke architectural elements crafted to redefine interior volumes.",
    deliverables: ["Demolition & construction plans", "Threshold & portal detailing", "Acoustic engineering", "3D architectural visualization"]
  },
  {
    id: "02",
    title: "Space Planning",
    subtitle: "Fluid Flow & Proportion",
    description: "Meticulous circulation studies and ergonomic zoning that ensure effortless everyday movement while framing views and optimizing natural daylight.",
    deliverables: ["Circulation diagrams", "Zoning schematics", "Volume & scale analysis", "Daylight mapping"]
  },
  {
    id: "03",
    title: "Material Selection",
    subtitle: "Tactile Curated Palettes",
    description: "Rigorous curation of authentic stones, woods, plasters, and textiles sourced directly from master quarries and boutique European mills.",
    deliverables: ["Comprehensive physical sample boards", "Quarry provenance logs", "Finish schedules", "Maintenance protocols"]
  },
  {
    id: "04",
    title: "Lighting Design",
    subtitle: "Atmospheric Scenography",
    description: "Concealed perimeter coves, architectural shadow gaps, and glare-free warm fixtures programmed to harmonize with the circadian rhythm of the day.",
    deliverables: ["Circadian dimming schedules", "Fixture specification books", "Shadow gap detailing", "Smart control integration"]
  },
  {
    id: "05",
    title: "Renovation Consultation",
    subtitle: "Expert Architectural Guidance",
    description: "High-level strategic advisement for luxury residential acquisitions, structural feasibility appraisals, and historical conservation upgrades.",
    deliverables: ["Site feasibility assessments", "Historical building compliance", "Budgetary frameworks", "Contractor vetting"]
  }
];
