import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects, trailImages } from "../data/projects";
import {
  useFinePointer,
  usePageTitle,
  useReducedMotion,
  useReveal,
} from "../lib/hooks";
import { useSite } from "../components/Site";
import {
  ArrowLink,
  Asterisk,
  Chip,
  CountUp,
  ProjectRows,
  Reveal,
  SectionHead,
} from "../components/ui";
import { Marquee } from "../components/Marquee";
import { ArtLab } from "../components/ArtLab";
import { cn } from "../utils/cn";

/* ============================ HERO ============================ */
const heroStack = [
  { src: "/images/intro-1.jpg", alt: "Designer's desk at night with wireframe sketches under an amber lamp", d: 0.5, pos: "left-[36%] top-[13%] -rotate-6" },
  { src: "/images/intro-2.jpg", alt: "Hands annotating a printed homepage layout", d: 1.4, pos: "left-[53%] top-[27%] rotate-2" },
  { src: "/images/intro-3.jpg", alt: "Laptop and phone glowing amber on a dark plinth", d: 0.9, pos: "left-[28%] top-[38%] rotate-3" },
  { src: "/images/intro-4.jpg", alt: "Designer silhouette backlit by amber window light", d: 2, pos: "left-[57%] top-[49%] rotate-[8deg]" },
];

function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const trailRoot = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const pool = useRef(0);
  const lastSpawn = useRef({ x: -999, y: -999 });

  // entrance
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reduced ? 0 : 0.25 });
      if (!reduced) {
        tl.fromTo(
          "[data-hero-img]",
          { yPercent: 160, opacity: 0, rotate: 16 },
          { yPercent: 0, opacity: 1, rotate: 0, duration: 1.15, ease: "power4.out", stagger: 0.09 },
          0
        )
          .fromTo(
            "[data-hero-line]",
            { yPercent: 118 },
            { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.11 },
            0.18
          )
          .fromTo(
            "[data-hero-meta]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 },
            0.55
          );
      } else {
        gsap.set("[data-hero-img], [data-hero-line], [data-hero-meta]", { clearProps: "all" });
      }
    }, root);
    return () => ctx.revert();
  }, [ready, reduced]);

  // pointer parallax on stack
  useEffect(() => {
    if (reduced || !fine) return;
    const el = root.current;
    if (!el) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width - 0.5;
      target.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cur.x += (target.x - cur.x) * 0.055;
      cur.y += (target.y - cur.y) * 0.055;
      el.querySelectorAll<HTMLElement>("img[data-depth]").forEach((img) => {
        const d = parseFloat(img.dataset.depth || "1");
        img.style.transform = `translate3d(${(-cur.x * d * 26).toFixed(1)}px, ${(-cur.y * d * 20).toFixed(1)}px, 0) scale(1.12)`;
      });
    };
    raf = requestAnimationFrame(loop);
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, [reduced, fine]);

  // cursor image trail
  useEffect(() => {
    if (reduced || !fine) return;
    const el = root.current;
    const holder = trailRoot.current;
    if (!el || !holder) return;
    let alive = 0;
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastSpawn.current.x;
      const dy = e.clientY - lastSpawn.current.y;
      if (dx * dx + dy * dy < 110 * 110 || alive > 11) return;
      lastSpawn.current = { x: e.clientX, y: e.clientY };
      const img = document.createElement("img");
      img.src = trailImages[pool.current++ % trailImages.length];
      img.alt = "";
      img.className =
        "trail-img w-[6.5rem] h-[8.5rem] object-cover border border-line bg-ink-2";
      img.style.left = `${e.clientX}px`;
      img.style.top = `${e.clientY}px`;
      img.style.setProperty("--r", `${(Math.random() * 22 - 11).toFixed(1)}deg`);
      alive++;
      img.addEventListener("animationend", () => {
        img.remove();
        alive--;
      });
      holder.appendChild(img);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduced, fine]);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      aria-label="Introduction"
    >
      <div ref={trailRoot} aria-hidden="true" />

      {/* stacked intro images — 3 layers: frame(pos) → entrance(gsap) → parallax(pointer) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {heroStack.map((im) => (
          <div
            key={im.src}
            className={cn(
              "absolute w-[clamp(9.5rem,17vw,17rem)] aspect-[4/5]",
              im.pos
            )}
          >
            <div
              data-hero-img
              className="w-full h-full overflow-hidden border border-line bg-ink-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <img
                data-depth={im.d}
                src={im.src}
                alt={im.alt}
                className="w-full h-full object-cover scale-105 will-change-transform"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>

      {/* giant wordmark */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-5 pt-24">
        <p
          data-hero-meta
          className="mono mb-6 md:mb-8 flex items-center gap-2.5 md:gap-3.5 border border-bone/25 bg-ink/70 backdrop-blur-sm px-3.5 md:px-5 py-2 md:py-2.5 text-bone shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
        >
          <Asterisk className="w-3 h-3 text-amber shrink-0" spin />
          <span className="tracking-[0.2em]">INDEPENDENT WEB DESIGN</span>
          <span className="text-amber hidden sm:inline" aria-hidden="true">—</span>
          <span className="hidden sm:inline tracking-[0.2em] text-bone-dim">CAPE TOWN, ZA</span>
          <Asterisk className="w-3 h-3 text-amber shrink-0 hidden sm:block" spin />
        </p>
        <h1 className="display font-light text-center leading-[0.82] tracking-[-0.04em] select-none">
          <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
            <span
              data-hero-line
              className="block text-[clamp(3.1rem,14.2vw,15.5rem)] will-change-transform"
            >
              SUNDOWNER
              <Asterisk className="inline-block w-[0.34em] h-[0.34em] text-amber align-baseline ml-[0.04em] -mb-[0.02em]" spin />
            </span>
          </span>
        </h1>
        <p className="overflow-hidden mt-4 md:mt-6">
          <span
            data-hero-line
            className="block display italic font-light text-[clamp(1.05rem,2.6vw,1.9rem)] text-bone-dim text-center"
          >
            websites that feel like{" "}
            <Asterisk className="inline-block w-[0.8em] h-[0.8em] text-amber align-[-0.08em] not-italic" />{" "}
            golden hour
          </span>
        </p>
      </div>

      {/* bottom meta */}
      <div className="relative flex items-end justify-between px-5 md:px-10 pb-6 md:pb-8 mono text-bone-dim">
        <span data-hero-meta className="hidden sm:block">EST. 2018 — 33.9°S, 18.4°E</span>
        <span data-hero-meta className="flex items-center gap-2 mx-auto sm:mx-0">
          SCROLL
          <ArrowDown className="w-3.5 h-3.5 text-amber animate-bounce" aria-hidden="true" />
        </span>
        <span data-hero-meta className="hidden sm:block">DESIGN · BUILD · MOTION</span>
      </div>
    </section>
  );
}

/* ============================ PAGE ============================ */
const services = [
  {
    n: "01",
    title: "Web Design",
    desc: "Strategy, art direction and interfaces that look inevitable, not assembled.",
    tags: "ART DIRECTION · UX / IA · UI DESIGN · PROTOTYPES",
  },
  {
    n: "02",
    title: "Development",
    desc: "Hand-built front-ends with real performance budgets. 90+ Lighthouse or we don't ship.",
    tags: "REACT · HEADLESS CMS · E-COMMERCE · A11Y",
  },
  {
    n: "03",
    title: "Brand Systems",
    desc: "Identity, voice and a toolkit your team can't accidentally ruin.",
    tags: "IDENTITY · TYPE SYSTEMS · GUIDELINES · ASSET KITS",
  },
  {
    n: "04",
    title: "Motion & 3D",
    desc: "Scroll choreography, micro-interactions and the occasional bit of theatre.",
    tags: "INTERACTION · GSAP · LOTTIE · WEBGL",
  },
];

const process = [
  { n: "01", t: "Listen", d: "We ask better questions before we open Figma. Your customers usually write the brief for us." },
  { n: "02", t: "Map", d: "Sitemap, flows, content priorities. Boring on paper, priceless at midnight." },
  { n: "03", t: "Design", d: "Type, colour and layout, argued over properly. Two rounds, not twenty." },
  { n: "04", t: "Build", d: "Weekly staging links from week one. No big reveals, no nasty surprises." },
  { n: "05", t: "Launch & look after", d: "We ship, we measure, we stay. A website is a garden, not a statue." },
];

const stats = [
  { v: "127", l: "Sites shipped" },
  { v: "09", l: "International awards" },
  { v: "96", l: "Avg. Lighthouse score" },
  { v: "0", l: "Missed launch dates" },
];

const quotes = [
  {
    text: "Sundowner took a product we called “inevitably boring” and made it the one thing clients compliment at dinner parties.",
    name: "Lerato Mokoena",
    role: "Head of Digital — Meridian",
  },
  {
    text: "They argued with me — politely, with evidence — and were right every time. Revenue is up 212%, and the site finally sounds like me.",
    name: "Jana Smit",
    role: "Founder — Fynbos & Field",
  },
  {
    text: "Direct bookings nearly doubled. The website makes twelve rooms feel like a destination, not a B&B with Wi-Fi.",
    name: "Carl Petersen",
    role: "GM — Kloof Corner",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 6500);
    return () => clearInterval(id);
  }, [paused]);

  const q = quotes[i];
  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative"
    >
      <blockquote
        key={i}
        className="quote-in display italic font-light text-[clamp(1.6rem,4vw,3.4rem)] leading-[1.15] tracking-tight max-w-5xl"
      >
        “{q.text}”
      </blockquote>
      <p className="mono text-smoke mt-8">
        <span className="text-amber">{q.name}</span> — {q.role}
      </p>
      <div className="flex gap-2 mt-8" aria-label="Testimonials navigation">
        {quotes.map((_, qi) => (
          <button
            key={qi}
            aria-current={qi === i}
            aria-label={`Show testimonial ${qi + 1}`}
            data-cursor="link"
            onClick={() => setI(qi)}
            className={cn(
              "mono px-4 py-2 border transition-colors duration-300",
              qi === i
                ? "border-amber text-amber"
                : "border-line text-smoke hover:border-bone-dim hover:text-bone"
            )}
          >
            0{qi + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* door CTA */
function DoorCTA() {
  return (
    <Link
      to="/contact"
      data-cursor="view"
      aria-label="Open the door — contact us"
      className="group relative block h-[68vh] md:h-[82vh] overflow-hidden border-y border-line"
    >
      <img
        src="/images/intro-2.jpg"
        alt="Hands marking up a design in warm light — the room behind the door"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="text-center">
          <span className="mono text-amber block mb-4">STEP INSIDE</span>
          <span className="display italic text-bone text-[clamp(1.4rem,3vw,2.4rem)]">
            hello@sundowner.studio ↗
          </span>
        </span>
      </span>
      {/* door panels */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/2 bg-ink border-r border-amber/40 flex items-center justify-end pr-[1.5vw] transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] md:group-hover:-translate-x-full"
      >
        <span className="display text-[9vw] md:text-[7.5vw] leading-none tracking-tight whitespace-nowrap">
          OPEN THE
        </span>
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1/2 bg-ink border-l border-amber/40 flex items-center justify-start pl-[1.5vw] transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] md:group-hover:translate-x-full"
      >
        <span className="display text-[9vw] md:text-[7.5vw] leading-none tracking-tight whitespace-nowrap">
          DOOR
        </span>
      </span>
      <span className="absolute bottom-8 inset-x-0 text-center mono text-amber md:hidden" aria-hidden="true">
        TAP TO ENTER
      </span>
    </Link>
  );
}

export function Home() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePageTitle("Sundowner® — Web Design Studio, Cape Town");
  const { ready } = useSite();

  return (
    <main ref={root} id="main">
      <Hero ready={ready} />

      <Marquee
        big
        duration={26}
        items={["Web Design", "Development", "Brand Systems", "Motion & 3D", "E-Commerce", "Creative Direction"]}
      />

      {/* statement */}
      <section className="relative px-5 md:px-10 py-24 md:py-40 overflow-hidden" aria-label="Manifesto">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 88% 100%, rgba(255,90,31,0.08), transparent 65%), radial-gradient(ellipse 40% 35% at 0% 0%, rgba(237,231,218,0.035), transparent 70%)",
          }}
        />
        <SectionHead index="SEC.01" label="THE PITCH" right="(WHY US)" className="relative mb-10 md:mb-16" />
        <div className="relative grid md:grid-cols-12 gap-10">
          <Reveal
            as="h2"
            className="md:col-span-8 display font-light text-[clamp(2.4rem,6.2vw,5.6rem)] leading-[1.02] tracking-tight"
          >
            <span>We make websites</span>
            <span>that feel like <em className="italic text-amber">golden hour</em> —</span>
            <span>warm, sharp, and worth</span>
            <span>stopping for.</span>
          </Reveal>
          <div className="md:col-span-3 md:col-start-10 flex flex-col justify-end" data-fade style={{ "--d": "250ms" } as React.CSSProperties}>
            <p className="text-bone-dim leading-relaxed text-sm md:text-base">
              Golden hour is the ten minutes when everything looks worth
              remembering. That's the bar. Strategy, type and motion, tuned
              until your site stops people mid-scroll like a Cape Town sunset.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <Chip>NO TEMPLATES</Chip>
              <Chip>NO JARGON</Chip>
              <Chip>NO MISSED LAUNCHES</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* selected work */}
      <section className="px-5 md:px-10 pb-24 md:pb-36" aria-label="Selected work">
        <SectionHead index="SEC.02" label="SELECTED WORK" right="(06 PROJECTS · 2023—2026)" className="mb-8 md:mb-12" />
        <div data-fade>
          <ProjectRows items={projects} />
        </div>
        <div className="flex justify-center mt-12" data-fade>
          <ArrowLink to="/work" className="text-bone text-sm">
            <span className="display italic text-lg tracking-normal">browse the full archive</span>
          </ArrowLink>
        </div>
      </section>

      {/* services */}
      <section className="px-5 md:px-10 py-24 md:py-36 border-t border-line bg-ink-2/40" aria-label="Services">
        <SectionHead index="SEC.03" label="WHAT WE DO" right="FULL SERVICE, SMALL TEAM" className="mb-10 md:mb-14" />
        <ul>
          {services.map((s, i) => (
            <li key={s.n} data-fade style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <Link
                to="/services"
                data-cursor="link"
                className={cn(
                  "group grid grid-cols-12 gap-x-4 gap-y-3 items-baseline py-8 md:py-10 border-t border-line",
                  i === services.length - 1 && "border-b"
                )}
              >
                <span className="mono text-amber col-span-2 md:col-span-1">({s.n})</span>
                <span className="display col-span-10 md:col-span-4 text-[clamp(1.8rem,3.6vw,3.2rem)] leading-none tracking-tight transition-all duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4 group-hover:italic">
                  {s.title}
                </span>
                <span className="col-span-10 col-start-3 md:col-span-4 md:col-start-6 text-sm md:text-base text-bone-dim leading-relaxed max-w-md">
                  {s.desc}
                </span>
                <span className="hidden lg:flex col-span-3 mono text-smoke leading-loose text-right justify-end items-center gap-2 self-center">
                  {s.tags}
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-smoke group-hover:text-amber transition-colors" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* stats */}
      <section className="border-t border-line" aria-label="Studio in numbers">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              data-fade
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className={cn(
                "px-6 md:px-10 py-10 md:py-16 border-line",
                i !== 0 && "border-l",
                i > 1 && "border-t md:border-t-0",
                i === 2 && "border-l-0 md:border-l"
              )}
            >
              <p className="display font-light text-[clamp(2.6rem,6vw,5.4rem)] leading-none tracking-tight">
                <CountUp value={s.v} />
                <Asterisk className="inline-block w-4 h-4 md:w-6 md:h-6 text-amber ml-1 -mt-6 align-top" />
              </p>
              <p className="mono text-smoke mt-4">{s.l.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="px-5 md:px-10 py-24 md:py-36 border-t border-line" aria-label="Process">
        <SectionHead index="SEC.04" label="HOW WE WORK" right="FIVE STEPS, NO SMOKE" className="mb-10 md:mb-14" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12">
          {process.map((p, i) => (
            <div key={p.n} data-fade style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="relative pt-6 border-t border-line">
              <span className="absolute -top-[1px] left-0 h-px w-14 bg-amber" data-grow />
              <p className="mono text-amber mb-3">{p.n}</p>
              <h3 className="display text-2xl md:text-[1.65rem] tracking-tight mb-3">{p.t}</h3>
              <p className="text-sm text-bone-dim leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* client marquee */}
      <Marquee
        duration={36}
        items={["Meridian", "Fynbos & Field", "Obsidian Works", "Helderberg Records", "Karoo Salt", "Kloof Corner", "Paperjet", "Noonday Café"]}
        className="border-t-0"
      />

      {/* testimonials */}
      <section className="px-5 md:px-10 py-24 md:py-36" aria-label="Testimonials">
        <SectionHead index="SEC.05" label="KIND WORDS" right="(UNSOLICITED, MOSTLY)" className="mb-10 md:mb-14" />
        <div data-fade>
          <Testimonials />
        </div>
      </section>

      {/* art lab */}
      <section className="px-5 md:px-10 py-24 md:py-36 border-t border-line bg-ink-2/40" aria-label="Art lab">
        <SectionHead index="SEC.06" label="THE ART LAB" right="WHERE WE BREAK THE WEB ON PURPOSE" className="mb-8 md:mb-10" />
        <p className="display italic font-light text-xl md:text-2xl text-bone-dim mb-10 md:mb-12 max-w-2xl" data-fade>
          Things we make when nobody is paying us. It keeps the paying work honest.
        </p>
        <div data-fade>
          <ArtLab />
        </div>
      </section>

      <div data-fade>
        <DoorCTA />
      </div>
    </main>
  );
}
