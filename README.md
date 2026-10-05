# SUNDOWNER®
### Independent web design studio. Cape Town.

SUNDOWNER® is a fictional web design studio and a concept study in what a studio website can feel like when the site itself is the portfolio.

In South Africa, a *sundowner* is the evening ritual of stopping to watch golden hour. That is the whole brand: websites that feel like golden hour. Warm, sharp, and worth stopping for.

*SUNDOWNER is a fictional studio. The clients, projects, testimonials, team and awards are invented for this concept.*

---

## The Concept

**Golden Hour, Computed.**

The site is built as a dark room lit by a single amber practical light. Every image, texture and interface element is graded into the same world: warm near-black shadows, bone-white highlights, one burnt-amber accent, and heavy film grain.

Rather than a standard agency layout, the design leans on oversized typography, editorial composition, and motion that supports the identity instead of decorating it.

---

## The Experience

- **Preloader** with a counter that leads into an intro sequence
- **Hero** with four stacked intro images, a cursor-following image trail and an oversized wordmark
- **Marquee band** of scrolling text
- **Statement section** revealed line by line
- **Selected Work** as rich rows showing role, timeline, year and team, with a floating hover preview
- **Services** as a numbered 01–04 index
- **Stats strip** with count-up numbers
- **Process** in five steps
- **Testimonials** that rotate
- **Art Lab** with three live canvas pieces: a flow field, a halftone sun and a grain study
- **"Open the Door"** call to action, where the panels part on hover
- **Footer** with a giant wordmark, a live Cape Town clock, a sitemap and a "Next page" teaser

### Pages

| Page | What's there |
|---|---|
| Home | The full long-scroll experience above |
| Work | A "Drag to Explore" horizontal carousel with physics, plus a full project index |
| Projects (6) | Hero, metadata, parallax cover, challenge / approach / outcome, code-built device mockups, results, next-project teaser |
| Studio | Manifesto, story, team, values, awards |
| Services | Expanded deliverables, honest pricing notes, FAQ |
| Contact | Validated form with budget pills, real error states and a friendly confirmation |

Shared across every page: an overlay menu, a custom cursor, a film-grain overlay, smooth scrolling and page-wipe transitions.

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

- **Fraunces**: oversized display serif, with italics as the accent
- **Archivo**: interface and body text
- **Space Mono**: metadata labels, indices and clocks, styled like museum captions

**Principles**

- Typography is the layout
- A single accent colour, used sparingly
- Hairline dividers and generous negative space
- Motion with intent: reveals, parallax, hover states with character
- Responsive layouts designed for mobile on purpose, not just squeezed down
- Respects `prefers-reduced-motion`

---

## Imagery

The site uses 22 original images made specifically for it, all in the same visual language: medium-format film look, heavy grain, chiaroscuro, a single amber light source.

- **10 AI-generated photographic images:** the intro and hero set, plus six project covers (fintech, skincare, architecture, vinyl label, provisions brand, boutique hotel)
- **12 hand-built code artworks:** textures, the three Art Lab canvases, device mockups, divider asterisks, the grain overlay, favicon and topographic line work, built with SVG, canvas and CSS

No stock photography.

---

## Built With

- HTML
- CSS
- JavaScript
- Hash-based routing, so it deploys anywhere as a static site

*(Update this list if the final build uses a framework or animation library.)*

---

## Run It

```
Open index.html in your browser
```

Or serve it locally:

```
npx serve .
```

## Deploy

The site is fully static, so any static host works:

- **Netlify / Vercel:** drag the project folder in, or connect the repo. No build step needed.
- **GitHub Pages:** works as-is. Because routing is hash-based, no subpath configuration is needed.

---

## Structure

```
index.html
css/             # design system, layout, motion
js/              # routing, cursor, transitions, canvas pieces
images/          # art-directed imagery
```

*(Adjust to match the actual folder layout.)*

---

## Notes

All photographic imagery in `images/` was AI-generated for this concept. The remaining artwork was built in code. AI tooling assisted during development.

The concept, creative direction, design decisions and project requirements were developed by me, with AI used as a design and development tool.

## Project Purpose

SUNDOWNER® was created as a personal web design and development experiment. It explores how typography, atmosphere, imagery and motion can combine into a website that feels like a designed experience rather than a conventional business site.

**SUNDOWNER®** Websites worth stopping for.
