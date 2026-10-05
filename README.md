# SUNDOWNER
### Independent web design studio. Cape Town.

![SUNDOWNER preview](docs/preview.png)

SUNDOWNER is a fictional web design studio and a concept study in what a studio website can feel like when the site itself is the portfolio.

In South Africa, a *sundowner* is the evening ritual of stopping to watch golden hour. That is the whole brand: websites that feel like golden hour. Warm, sharp, and worth stopping for.

> **This is a fictional project.** SUNDOWNER is not a real business. Every client, project, testimonial, team member, award, price, statistic and contact detail on the site is invented for this concept. Any resemblance to real people or companies is coincidental. Nothing submitted through the site's forms is sent or stored anywhere.

---

## The Concept

**Golden Hour, Computed.**

The site is built as a dark room lit by a single amber practical light. Every image, texture and interface element is graded into the same world: warm near-black shadows, bone-white highlights, one burnt-amber accent, and heavy film grain.

Rather than a standard agency layout, the design leans on oversized typography, editorial composition, and motion that supports the identity instead of decorating it.

---

## The Experience

- **Preloader:** a 0 to 100 counter in giant display type while four intro images cycle in a tilted stack, then the curtain lifts as the hero begins, a handoff rather than a cut
- **Hero:** an oversized wordmark over a four-layer image stack (each layer with its own entrance and parallax depth), a cursor-following image trail, and a live Cape Town clock in the header
- **Marquee band** and a **manifesto** revealed line by line
- **Selected Work** as rich rows showing index, title, role, timeline, year and team, with a floating cover preview that follows the cursor
- **Services** as a numbered 01 to 04 index
- **Stats strip** with count-up numbers
- **Process** in five steps
- **Testimonials** that rotate, plus a client wordmark marquee
- **Art Lab** with three live pieces: a flow-field canvas, a hover-rising halftone sun, and a pure-CSS grain study
- **"Open the Door"** call to action, where the panels part on hover to reveal the studio
- **Footer** with a contextual next-page teaser, sitemap, live Cape Town clock, coordinates and a giant wordmark with an amber glow

### Pages

| Page | What's there |
|---|---|
| Home | The full long-scroll experience above |
| Work | A physics-based "Drag to Explore" carousel (momentum, rubber-banding, per-card parallax, progress line) plus a full typographic index |
| Projects (6) | Metadata grid, parallax hero, challenge / fix / outcome, device mockups built in code, count-up results, client quote, next-project teaser |
| Studio | Origin story, house rules, team rows with hover plates, awards |
| Services | Four services with prices, a care-plan strip and an animated FAQ |
| Contact | Validated form with budget pills, live error messages and a friendly confirmation, plus an availability card and clocks |

Shared across every page: an overlay menu, a custom cursor with VIEW, DRAG and link modes, page-wipe transitions, smooth scrolling and a film-grain overlay.

---

## Design Direction

**Palette**

| Colour | Hex |
|---|---|
| Ink | `#0B0A08` |
| Bone | `#EDE7DA` |
| Burnt Amber | `#FF5A1F` |
| Smoke | `#6E6A61` |
| Hairlines | Bone at 12% |

**Typography**

- **Fraunces:** oversized display serif, with italics as the accent
- **Archivo:** interface and body text
- **Space Mono:** metadata labels, indices and clocks, styled like museum captions

**Principles**

- Typography is the layout
- A single accent colour, used sparingly
- Hairline dividers and generous negative space
- Motion with intent: reveals, parallax, hover states with character
- Responsive layouts designed for mobile on purpose, not just squeezed down

**Accessibility and performance**

- Semantic HTML, visible focus states, a skip link and alt text on images
- Reduced-motion fallbacks for animation and smooth scrolling
- Lazy loading for images below the fold

---

## Imagery

The site uses 10 AI-generated photographs plus artwork built in code. Everything shares one visual language: medium-format film look, heavy grain, chiaroscuro, a single amber light source against near-black.

- **10 AI-generated photographs:** four intro and hero images, plus six project covers (fintech, skincare, architecture, vinyl label, provisions brand, boutique hotel)
- **Code-built artwork:** textures, the three Art Lab pieces, the device mockups on each project page (dashboard chart, commerce grid, record player, hotel booking card), SVG divider asterisks and the grain overlay

No stock photography.

---

## Built With

- React
- TypeScript
- Vite
- GSAP (animation, scroll-driven motion, page transitions)
- Lenis (smooth scrolling)
- CSS
- Hash-based routing

---

## Run It

```
npm install
npm run dev
```

## Build / Deploy

```
npm run build     # outputs dist/
```

The build is a fully static site, so any static host works:

- **Netlify:** drag the `dist/` folder in, or connect the repo (build command `npm run build`, output `dist`).
- **Vercel:** connect the repo. No extra config needed.
- **GitHub Pages:** works too, but Pages serves from a subpath (`/repo-name/`), so set `base: '/repo-name/'` in `vite.config.ts` before building, or asset URLs won't resolve.

---

## Structure

```
src/
  components/      # reusable UI and animation pieces
  data/            # site content (projects, services, copy)
  lib/             # shared setup and helpers
  pages/           # the site's pages
  utils/           # small utilities
  App.tsx          # app shell and routing
  main.tsx         # entry point
  index.css        # global styles and design tokens
public/            # art-directed images
index.html
vite.config.ts
tsconfig.json
```

---

## Notes

The photographs in `public/` were AI-generated for this concept. The remaining artwork was built in code. AI tooling generated the site's concept, visual system and code during development.

The brief, references and creative direction were mine: a web design studio site in the spirit of two reference sites, with at least 20 original images and a high bar for polish. The studio name, palette, typography and build were generated with AI from that brief and refined through iteration.

## Project Purpose

SUNDOWNER was created as a personal web design and development experiment. It explores how typography, atmosphere, imagery and motion can combine into a website that feels like a designed experience rather than a conventional business site.

SUNDOWNER is a fictional studio created for portfolio purposes. It is not a registered business or trademark.

---

## License

© 2026 Yoxei-1. All rights reserved.

This project is shared for viewing and portfolio purposes only. You may not copy, reuse, redistribute or present this design, code or imagery as your own without written permission.

**SUNDOWNER** Websites worth stopping for.
