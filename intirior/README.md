# AURELIA — Cinematic Scroll-Controlled Interior Architecture Website

A luxury interior design studio web experience built with **React, Vite, Tailwind CSS, GSAP ScrollTrigger, and Lenis**. The website bridges high-end architectural film with an editorial portfolio, featuring scroll-driven frame synchronization, masked typography reveals, interactive case studies, and responsive design.

---

## 1. Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation & Scroll Pinning**: [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling**: [Lenis 1.1](https://lenis.darkroom.engineering/) (synchronized directly with GSAP's ticker)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Design Tokens**: Charcoal `#151515`, Warm Ivory `#F5F1E8`, Muted Bronze `#A88B67`, Playfair Display & Cinzel serif typography paired with Inter.

---

## 2. Asset Structure & Placement

The project expects static media to reside in the `public/` directory:

```
public/
├── videos/
│   └── hero.mp4            <-- Place your landscape 16:9 Google Flow MP4 here
└── images/
    ├── hero-poster.webp    <-- Primary poster image before video scrubbing
    ├── hero.jpg            <-- Architectural hero fallback
    ├── bedroom.jpg         <-- Case Study 01: Contemporary Residence
    ├── close.jpg           <-- Case Study 02: Modern Luxury Apartment
    ├── galary.jpg          <-- Case Study 03: Minimalist Living Space
    └── matiral.jpg         <-- Design Philosophy: Curated Material Palette
```

### Video Asset Guidelines
- **Resolution**: 1920x1080 (16:9 Landscape) or 2560x1440.
- **Audio**: Muted (`video.muted = true`, `video.playsInline = true`).
- **Optimal Scrubbing Encoding (FFmpeg)**:
  Standard MP4 videos place keyframes (I-frames) every 1 to 5 seconds. To achieve **fluid, instant, jitter-free scroll scrubbing**, encode the video with frequent keyframes (or intra-frame encoding) and faststart metadata flags:
  ```bash
  # Intra-frame encoding for instantaneous scrubbing:
  ffmpeg -i input.mp4 -vcodec libx264 -crf 19 -g 1 -pix_fmt yuv420p -movflags +faststart public/videos/hero.mp4
  ```

### Graceful Fallback Behavior
If `/videos/hero.mp4` is absent, fails to decode, or the visitor has enabled `prefers-reduced-motion`:
1. The site **gracefully renders the high-resolution poster image** (`/images/hero-poster.webp` / `/images/hero.jpg`) with a subtle cinematic scale animation.
2. A non-intrusive developer status pill in the hero explains that the photographic sequence is active and guides you to link the video asset.
3. Zero blank screens, broken UI states, or console errors occur.

---

## 3. Architecture & Video Synchronization

### Key Synchronization Mechanics in `ScrollVideoHero.jsx`:
- **Scroll Pinning**: The hero section is pinned using `gsap.timeline({ scrollTrigger: { pin: true, scrub: 0.8, ... } })`.
- **Duration Normalization**: The component waits for the video's `loadedmetadata` event to dynamically retrieve `video.duration`, rather than assuming a fixed duration.
- **Micro-Seek Throttling**: Seeks are guarded by a minimum delta threshold (`Math.abs(video.currentTime - targetTime) > 0.03`) to avoid overloading browser hardware decoders with redundant seeks.
- **Frame Callback**: Leverages `video.requestVideoFrameCallback` where supported (with fallback to `requestAnimationFrame`) to ensure frames are painted smoothly in lockstep with the scroll.
- **Lenis + GSAP Integration**: In `App.jsx`, Lenis updates are piped into `ScrollTrigger.update`, and Lenis's `raf` loop is driven directly by GSAP's high-precision internal ticker (`gsap.ticker.add(...)`) with `lagSmoothing(0)` to prevent desync.
- **Lifecycle Cleanup**: All timelines and scroll triggers are encapsulated within `gsap.context()`, cleanly terminating on component unmount to prevent memory leaks.

---

## 4. Website Sections

1. **Top Navigation (`Navbar.jsx`)**:
   - Fixed architectural bar with frosted backdrop blur on scroll.
   - Smooth anchor navigation (`#studio`, `#projects`, `#philosophy`, `#services`, `#contact`).
   - Mobile slide-down navigation drawer with keyboard focus handling.

2. **Main Experience (`ScrollVideoHero.jsx`)**:
   - Full-screen pinned 16:9 architectural film.
   - Progressive narrative reveal across 4 phases:
     - *Phase 1*: "SPACES THAT TELL STORIES" (Initial Hero)
     - *Phase 2*: "WHERE PROPORTION HONORS LIGHT"
     - *Phase 3*: "ORGANIC TEXTURES CRAFTED BY HAND"
     - *Phase 4*: "ARCHITECTURE DESIGNED TO BE INHABITED"
   - Subtle scroll indicator and synchronized progress bar.

3. **Section A: Studio Introduction (`StudioIntro.jsx`)**:
   - Headline: *"DESIGN IS HOW A SPACE MAKES YOU FEEL."*
   - Masked line reveals with staggered GSAP transitions.
   - Core practice pillars: Architecture, Authentic Materiality, Circadian Scenography, Generational Longevity.

4. **Section B: Featured Projects (`Projects.jsx` & `ProjectCard.jsx`)**:
   - Centralized project catalog in `src/data/projects.js`.
   - 3 Configurable Case Studies:
     - *Contemporary Residence* (Private sanctuary & acoustic timber)
     - *Modern Luxury Apartment* (Floating volumes & patinated bronze)
     - *Minimalist Living Space* (Double-height lime plaster gallery)
   - Interactive project detail modal displaying architectural scope, timelines, materials, and dimensional scale.
   - Explicit demo indicators ensuring complete client transparency.

5. **Section C: Design Philosophy (`Philosophy.jsx`)**:
   - Headline: *"TIMELESS MATERIALS. INTENTIONAL SPACES."*
   - Two-column layout with subtle parallax scroll on the material photography (`/images/matiral.jpg`).
   - Detailed specifications for Natural Stone, Architectural Timber, Living Metals, and Textile Craft.

6. **Section D: Studio Services (`Services.jsx`)**:
   - Interactive accordion cards for:
     - Interior Architecture
     - Space Planning
     - Material Selection
     - Lighting Design
     - Renovation Consultation
   - Expandable scope breakdowns and itemized deliverables.

7. **Section E: Contact (`Contact.jsx`)**:
   - Headline: *"LET'S CREATE YOUR SPACE."*
   - Fields: Full Name, Email, Project Type, Approximate Budget, Project Vision.
   - Real-time client-side validation.
   - **Explicit Submission Mechanism**: Compiles inquiry into an authenticated `mailto:` dispatch and one-click clipboard copy option. Never fakes network delivery.

8. **Footer (`Footer.jsx`)**:
   - Studio provenance, office locations, back-to-top button with smooth scroll behavior.

---

## 5. Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd intirior

# Install dependencies
npm install

# Start local development server
npm run dev
```

The site will be available at `http://localhost:3000`.

---

## 6. Production Build & Deployment

### Build Command
```bash
npm run build
```
This compiles optimized production bundles into the `dist/` directory.

### Preview Local Build
```bash
npm run preview
```

### Vercel Deployment
The repository includes a ready-to-use `vercel.json` configured with:
- Single-page application rewrites (`/(.*) -> /index.html`).
- Byte-range request headers (`Accept-Ranges: bytes`) for seamless video streaming.
- Long-term caching headers for media assets (`Cache-Control: public, max-age=31536000, immutable`).

To deploy via Vercel CLI:
```bash
vercel
```
Or connect your GitHub repository to [Vercel Dashboard](https://vercel.com/new).

---

## 7. Responsive Breakpoints & Accessibility

- **Responsive Viewports**: Thoroughly optimized for `360px`, `390px` (mobile), `768px` (tablet), `1024px` (laptop), and `1440px+` (ultra-wide desktop).
- **Reduced Motion Support**: Listens to `prefers-reduced-motion: reduce`. Disables rapid frame scrubbing and high-velocity transforms in favor of elegant static crossfades.
- **Accessibility**: Includes semantic headings (`h1` through `h4`), ARIA dialog roles for modals, screen-reader text, and keyboard focus outlines.
