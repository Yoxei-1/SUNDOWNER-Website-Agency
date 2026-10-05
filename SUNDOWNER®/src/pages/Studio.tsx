import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { usePageTitle, useReveal } from "../lib/hooks";
import { Asterisk, Parallax, Reveal, SectionHead } from "../components/ui";
import { Marquee } from "../components/Marquee";
import { cn } from "../utils/cn";

const team = [
  { name: "Mia Vogel", role: "Founder & Creative Director", since: "2018", img: "/images/intro-4.jpg" },
  { name: "Thabo Nkosi", role: "Technical Director", since: "2018", img: "/images/intro-3.jpg" },
  { name: "Aisha Pandor", role: "Design Lead", since: "2020", img: "/images/intro-2.jpg" },
  { name: "Danie Kruger", role: "Motion & Build", since: "2021", img: "/images/intro-1.jpg" },
  { name: "Sara Maseko", role: "Producer", since: "2022", img: "/images/p-kloof.jpg" },
  { name: "Pixel", role: "Head of Morale (a dog)", since: "2019", img: "/images/p-helderberg.jpg" },
];

const values = [
  { n: "V.01", t: "No templates", d: "If we've made it before, we won't make it again. Your competitors can have the theme store." },
  { n: "V.02", t: "Argue politely", d: "We push back, with evidence. You hired us for judgement, not compliance." },
  { n: "V.03", t: "Ship or don't", d: "A launch date is a promise. We have never broken one and intend to keep it that way." },
  { n: "V.04", t: "Keep the fun", d: "Serious results, unserious meetings. Joy is a design material — you can feel when it's missing." },
];

const awards = [
  { name: "Awwwards", result: "Honorable Mention ×2", year: "2024 / 2025" },
  { name: "CSS Design Awards", result: "Site of the Day", year: "2024" },
  { name: "FWA", result: "FWA of the Day", year: "2023" },
  { name: "The Loeries", result: "Digital Craft — Gold", year: "2023" },
  { name: "The Bookmarks", result: "Best Studio Site", year: "2025" },
];

export function Studio() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePageTitle("Studio — Sundowner");

  return (
    <main ref={root} id="main" className="pt-28 md:pt-40">
      <header className="px-5 md:px-10 pb-12 md:pb-20">
        <p className="mono text-smoke mb-6 flex items-center gap-3" data-fade>
          <Asterisk className="w-3 h-3 text-amber" spin />
          INDEX <span className="text-amber">/</span> STUDIO <span className="text-amber">/</span> EST. 2018
        </p>
        <Reveal as="h1" className="display font-light leading-[0.85] tracking-[-0.04em] text-[clamp(3.4rem,13vw,13rem)]">
          <span>THE STUDIO</span>
        </Reveal>
        <Reveal as="p" className="display italic font-light text-[clamp(1.5rem,4vw,3.2rem)] text-smoke mt-3">
          <span>five humans, one dog, zero templates</span>
        </Reveal>
      </header>

      {/* manifesto */}
      <section className="px-5 md:px-10 py-16 md:py-24 border-t border-line" aria-label="Manifesto">
        <SectionHead index="SEC.01" label="THE STORY" className="mb-10 md:mb-14" />
        <div className="grid md:grid-cols-12 gap-10">
          <Reveal as="h2" className="md:col-span-7 display font-light text-[clamp(1.8rem,4.4vw,3.8rem)] leading-[1.08] tracking-tight">
            <span>The web deserved better</span>
            <span>than rushed templates —</span>
            <span>so in 2018 we opened a studio</span>
            <span>in a drafty <em className="italic text-amber">Woodstock warehouse</em></span>
            <span>to prove it.</span>
          </Reveal>
          <div className="md:col-span-4 md:col-start-9 space-y-6 text-bone-dim leading-relaxed text-[0.95rem] md:text-base self-end">
            <p data-fade>
              We started as two freelancers who kept getting hired to fix other
              agencies' rushed work. Eventually we got tired of being the
              ambulance and became the seatbelt. Two laptops, one kettle, one
              stubborn belief.
            </p>
            <p data-fade style={{ "--d": "120ms" } as React.CSSProperties}>
              Eight years on, we're five humans and one office dog. We take on
              four projects at a time — never five — because attention is the
              whole product. The kettle survived.
            </p>
            <p data-fade style={{ "--d": "220ms" } as React.CSSProperties}>
              Our clients — from Cape Town to Copenhagen — share one trait:
              they care how they show up, and they want a site that works as
              hard as it looks.
            </p>
          </div>
        </div>
      </section>

      {/* images */}
      <section className="px-5 md:px-10 pb-20 md:pb-28 grid grid-cols-12 gap-4 md:gap-6" aria-label="Studio photographs">
        <div className="col-span-12 md:col-span-5" data-fade>
          <Parallax
            src="/images/intro-4.jpg"
            alt="A designer's silhouette in the Woodstock studio, backlit by amber window light"
            className="aspect-[4/5] border border-line"
            speed={0.12}
          />
          <p className="mono text-smoke mt-3">FIG.01 — THE WAREHOUSE, 6:42PM</p>
        </div>
        <div className="col-span-7 md:col-span-4 md:col-start-7 md:mt-24" data-fade style={{ "--d": "150ms" } as React.CSSProperties}>
          <Parallax
            src="/images/intro-1.jpg"
            alt="Overhead view of wireframe sketches and coffee on the studio desk"
            className="aspect-[4/5] border border-line"
            speed={0.2}
          />
          <p className="mono text-smoke mt-3">FIG.02 — WHERE SCREENS START</p>
        </div>
        <div className="col-span-5 md:col-span-2 md:col-start-11 md:mt-48 self-start" data-fade style={{ "--d": "250ms" } as React.CSSProperties}>
          <p className="display italic font-light text-xl md:text-2xl leading-snug text-bone-dim">
            “We take the fun seriously.”
          </p>
          <p className="mono text-smoke mt-3 flex items-center gap-2">HOUSE RULE Nº1 <ArrowDown className="w-3 h-3 text-amber" /></p>
        </div>
      </section>

      {/* values */}
      <section className="px-5 md:px-10 py-20 md:py-28 border-t border-line bg-ink-2/40" aria-label="Values">
        <SectionHead index="SEC.02" label="HOUSE RULES" right="NON-NEGOTIABLE" className="mb-10 md:mb-14" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {values.map((v, i) => (
            <div key={v.n} className="relative pt-6 border-t border-line" data-fade style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <span className="absolute -top-[1px] left-0 h-px w-12 bg-amber" data-grow />
              <p className="mono text-amber mb-3">{v.n}</p>
              <h3 className="display text-2xl tracking-tight mb-3">{v.t}</h3>
              <p className="text-sm text-bone-dim leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* team */}
      <section className="px-5 md:px-10 py-20 md:py-28 border-t border-line" aria-label="Team">
        <SectionHead index="SEC.03" label="THE HUMANS" right="(AND ONE DOG)" className="mb-8 md:mb-12" />
        <ul>
          {team.map((m, i) => (
            <li
              key={m.name}
              data-fade
              style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
              className={cn(
                "group relative grid grid-cols-12 items-baseline gap-x-4 py-6 md:py-8 border-t border-line",
                i === team.length - 1 && "border-b"
              )}
            >
              <span className="mono text-smoke col-span-2 md:col-span-1">0{i + 1}</span>
              <span className="display col-span-10 md:col-span-5 text-[clamp(1.6rem,3.4vw,3rem)] leading-none tracking-tight transition-all duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4 group-hover:italic">
                {m.name}
                {m.name === "Pixel" && <Asterisk className="inline-block w-4 h-4 text-amber ml-2 align-top" spin />}
              </span>
              <span className="col-span-8 col-start-3 md:col-span-4 md:col-start-auto text-sm md:text-base text-bone-dim">{m.role}</span>
              <span className="mono text-smoke col-span-2 text-right">SINCE {m.since}</span>
              <img
                src={m.img}
                alt=""
                loading="lazy"
                decoding="async"
                className="hidden md:block absolute right-[16%] top-1/2 -translate-y-1/2 w-24 h-28 object-cover border border-line opacity-0 rotate-3 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100 pointer-events-none"
              />
            </li>
          ))}
        </ul>
        <p className="mono text-smoke mt-6" data-fade>
          PORTRAITS ARE ATMOSPHERIC. SO ARE WE. <span className="text-amber">—</span> HR (MIA)
        </p>
      </section>

      <Marquee duration={30} items={["Cape Town", "Copenhagen", "Nairobi", "Amsterdam", "Johannesburg", "Remote, always"]} />

      {/* awards */}
      <section className="px-5 md:px-10 py-20 md:py-28" aria-label="Recognition">
        <SectionHead index="SEC.04" label="RECOGNITION" right="MUM IS PROUD" className="mb-8 md:mb-12" />
        <ul>
          {awards.map((a, i) => (
            <li
              key={a.name}
              data-fade
              style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
              className={cn(
                "grid grid-cols-12 items-baseline gap-x-4 py-5 border-t border-line",
                i === awards.length - 1 && "border-b"
              )}
            >
              <span className="display text-xl md:text-3xl tracking-tight col-span-12 md:col-span-5">{a.name}</span>
              <span className="mono text-amber col-span-7 md:col-span-4 mt-1 md:mt-0">{a.result.toUpperCase()}</span>
              <span className="mono text-smoke col-span-5 md:col-span-3 text-right md:text-left mt-1 md:mt-0">{a.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
