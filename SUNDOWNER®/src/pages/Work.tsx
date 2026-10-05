import { useRef } from "react";
import { projects } from "../data/projects";
import { usePageTitle, useReveal } from "../lib/hooks";
import { DragCarousel } from "../components/DragCarousel";
import { Marquee } from "../components/Marquee";
import { Asterisk, ProjectRows, Reveal, SectionHead } from "../components/ui";

export function Work() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePageTitle("Work — Sundowner Studio");

  return (
    <main ref={root} id="main" className="pt-28 md:pt-40">
      <header className="px-5 md:px-10 pb-10 md:pb-16">
        <p className="mono text-smoke mb-6 flex items-center gap-3" data-fade>
          <Asterisk className="w-3 h-3 text-amber" spin />
          INDEX <span className="text-amber">/</span> WORK <span className="text-amber">/</span> (06 PROJECTS, 2023—2026)
        </p>
        <Reveal
          as="h1"
          className="display font-light leading-[0.85] tracking-[-0.04em] text-[clamp(4rem,15vw,15rem)]"
        >
          <span>WORK</span>
        </Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 md:mt-6">
          <Reveal as="p" className="display italic font-light text-[clamp(1.6rem,4.4vw,3.6rem)] text-smoke leading-none">
            <span>the receipts, basically</span>
          </Reveal>
          <p className="mono text-smoke max-w-xs leading-relaxed text-right md:text-left" data-fade style={{ "--d": "300ms" } as React.CSSProperties}>
            Every project shipped on time, on budget, and with its Lighthouse
            dignity intact. Drag around.
          </p>
        </div>
      </header>

      <div data-fade>
        <DragCarousel items={projects} />
      </div>

      <Marquee
        big
        duration={24}
        className="mt-16 md:mt-24"
        items={["Design", "Build", "Ship", "Measure", "Repeat"]}
      />

      <section className="px-5 md:px-10 py-20 md:py-32" aria-label="Full project index">
        <SectionHead index="SEC.02" label="FULL INDEX" right="ROLE / TIMELINE / YEAR / TEAM" className="mb-8 md:mb-12" />
        <div data-fade>
          <ProjectRows items={projects} />
        </div>
      </section>
    </main>
  );
}
