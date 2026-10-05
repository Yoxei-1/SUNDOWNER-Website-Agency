import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getProject, nextProject } from "../data/projects";
import { usePageTitle, useReveal } from "../lib/hooks";
import { ArrowLink, Asterisk, Chip, CountUp, Parallax, Reveal, SectionHead } from "../components/ui";
import { MockWindow } from "../components/MockWindow";
import { cn } from "../utils/cn";

export function Project() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePageTitle(project ? `${project.name} — Sundowner Studio` : "Work — Sundowner Studio");

  if (!project) return <Navigate to="/work" replace />;
  const next = nextProject(project.slug);

  const meta = [
    ["Client", project.name],
    ["Year", project.year],
    ["Role", project.role],
    ["Timeline", project.timeline],
    ["Team", project.team],
    ["Stack", project.stack],
  ] as const;

  return (
    <main ref={root} id="main" className="pt-28 md:pt-40">
      {/* header */}
      <header className="px-5 md:px-10 pb-10 md:pb-14">
        <p className="mono text-smoke mb-6 flex items-center gap-3" data-fade>
          <Asterisk className="w-3 h-3 text-amber" spin />
          <Link to="/work" className="hover:text-bone transition-colors" data-cursor="link">WORK</Link>
          <span className="text-amber">/</span> {project.name.toUpperCase()}
        </p>
        <Reveal as="h1" className="display font-light leading-[0.88] tracking-[-0.035em] text-[clamp(2.8rem,9.5vw,10rem)]">
          <span>{project.name}</span>
        </Reveal>
        <Reveal as="p" className="display italic font-light text-[clamp(1.3rem,3.4vw,2.6rem)] text-smoke mt-2">
          <span>{project.tagline}</span>
        </Reveal>
      </header>

      {/* meta grid */}
      <div className="px-5 md:px-10 mb-10 md:mb-14" data-fade>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-line">
          {meta.map(([k, v]) => (
            <li key={k} className="border-b border-r border-line px-4 py-4 md:py-5">
              <p className="mono text-amber mb-1.5">{k.toUpperCase()}</p>
              <p className="text-sm md:text-[0.95rem] text-bone-dim">{v}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* cover */}
      <div className="px-5 md:px-10">
        <Parallax
          src={project.cover}
          alt={project.coverAlt}
          className="w-full h-[52vh] md:h-[78vh] border border-line"
          speed={0.16}
          eager
        />
        <p className="mono text-smoke mt-3 flex justify-between">
          <span>FIG.01 — HERO PLATE</span>
          <span className="text-amber">{project.category}</span>
        </p>
      </div>

      {/* overview */}
      <section className="px-5 md:px-10 py-20 md:py-32 grid md:grid-cols-12 gap-10" aria-label="Case study">
        <div className="md:col-span-4">
          <SectionHead index="01" label="OVERVIEW" className="md:sticky md:top-28" />
        </div>
        <div className="md:col-span-8">
          <Reveal as="p" className="display font-light text-[clamp(1.5rem,2.9vw,2.5rem)] leading-[1.2] tracking-tight max-w-3xl">
            <span>{project.summary}</span>
          </Reveal>
          <div className="mt-14 space-y-12 max-w-2xl">
            {[
              ["THE PROBLEM", project.challenge],
              ["THE FIX", project.approach],
              ["WHAT HAPPENED", project.outcome],
            ].map(([label, copy], i) => (
              <div key={label} data-fade style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                <p className="mono text-amber mb-3 flex items-center gap-3">
                  <span className="w-6 h-px bg-amber inline-block" /> {label}
                </p>
                <p className="text-bone-dim leading-[1.75] text-[0.95rem] md:text-base">{copy}</p>
              </div>
            ))}
            <div data-fade>
              <p className="mono text-smoke mb-4">DELIVERABLES</p>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((d) => (
                  <Chip key={d}>{d.toUpperCase()}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* live mock */}
      <section className="px-5 md:px-10 pb-20 md:pb-32" aria-label="Interface preview">
        <div className="max-w-6xl mx-auto">
          <SectionHead index="02" label="THE INTERFACE" right="REBUILT IN CODE" className="mb-8" />
          <div data-fade>
            <MockWindow project={project} />
            <p className="mono text-smoke mt-3 flex justify-between">
              <span>FIG.02 — NO SCREENSHOTS WERE HARMED</span>
              <span className="text-amber">{project.url}</span>
            </p>
          </div>
        </div>
      </section>

      {/* results */}
      <section className="border-t border-line" aria-label="Results">
        <div className="grid sm:grid-cols-3">
          {project.results.map((r, i) => (
            <div
              key={r.label}
              data-fade
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className={cn("px-6 md:px-10 py-12 md:py-16 border-line", i !== 0 && "border-t sm:border-t-0 sm:border-l")}
            >
              <p className="display font-light text-[clamp(2.6rem,5.5vw,5rem)] leading-none tracking-tight text-amber">
                <CountUp value={r.value} />
              </p>
              <p className="mono text-smoke mt-4">{r.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* quote */}
      <section className="px-5 md:px-10 py-20 md:py-32 border-t border-line" aria-label="Client quote">
        <div className="max-w-5xl">
          <Asterisk className="w-6 h-6 text-amber mb-8" spin />
          <Reveal as="blockquote" className="display italic font-light text-[clamp(1.5rem,3.6vw,3rem)] leading-[1.18] tracking-tight">
            <span>“{project.quote.text}”</span>
          </Reveal>
          <p className="mono text-smoke mt-8" data-fade>
            <span className="text-bone">{project.quote.name}</span> — {project.quote.title}
          </p>
        </div>
      </section>

      {/* next project */}
      <Link
        to={`/work/${next.slug}`}
        data-cursor="view"
        className="group relative block border-t border-line px-5 md:px-10 py-16 md:py-24 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8 justify-between">
          <div>
            <p className="mono text-smoke mb-4 flex items-center gap-3">
              <Asterisk className="w-3 h-3 text-amber" spin /> NEXT PROJECT
            </p>
            <span className="display font-light block text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] tracking-tight transition-all duration-500 group-hover:translate-x-3 md:group-hover:translate-x-6 group-hover:italic">
              {next.name}
              <span className="text-amber">.</span>
            </span>
            <span className="mono text-smoke mt-4 block">{next.category} — {next.year}</span>
          </div>
          <div className="relative w-full md:w-[26rem] aspect-[4/3] overflow-hidden border border-line shrink-0">
            <img
              src={next.cover}
              alt={next.coverAlt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:scale-105"
            />
            <ArrowUpRight className="absolute top-3 right-3 w-7 h-7 text-bone bg-ink/70 p-1 transition-colors duration-300 group-hover:text-amber" aria-hidden="true" />
          </div>
        </div>
      </Link>

      <div className="px-5 md:px-10 py-8 border-t border-line flex flex-col sm:flex-row justify-between gap-3 mono text-smoke">
        <ArrowLink to="/work">BACK TO ALL WORK</ArrowLink>
        <span>CASE STUDY — ©{project.year} SUNDOWNER STUDIO</span>
      </div>
    </main>
  );
}
