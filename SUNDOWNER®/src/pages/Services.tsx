import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { usePageTitle, useReveal } from "../lib/hooks";
import { ArrowLink, Asterisk, Chip, Reveal, SectionHead } from "../components/ui";
import { Marquee } from "../components/Marquee";
import { cn } from "../utils/cn";

const services = [
  {
    n: "01",
    title: "Web Design",
    lead: "Websites that look expensive because they were thought hard, not because they cost a fortune.",
    body: "Everything starts with strategy: who you're talking to, what they need in the first eight seconds, and what one thing the site must make them do. Then art direction, information architecture, and an interface that fights for every pixel.",
    deliverables: ["Art direction", "UX & information architecture", "UI design systems", "Interactive prototypes", "Content & copy direction", "Accessibility review"],
    from: "from R95k",
    duration: "6–10 weeks",
  },
  {
    n: "02",
    title: "Development",
    lead: "Hand-built front-ends with performance budgets we actually respect.",
    body: "We write the code we design, which means nothing gets lost in translation and everything stays fast. React front-ends, headless content, e-commerce that converts, and Core Web Vitals in the green. Lighthouse 90+ or we don't ship — that's in the contract.",
    deliverables: ["React / Vite front-ends", "Headless CMS (Sanity, Payload)", "Shopify Hydrogen e-commerce", "Motion & WebGL build", "CI, hosting & analytics setup", "Core Web Vitals guarantee"],
    from: "from R120k",
    duration: "8–14 weeks",
  },
  {
    n: "03",
    title: "Brand Systems",
    lead: "Identity, voice and a toolkit your team can't accidentally ruin.",
    body: "A brand is what survives PowerPoint. We build tight identity systems — logotype, type scale, colour, voice — plus the templates and guardrails that keep intern-designed decks from going rogue at 11pm before the pitch.",
    deliverables: ["Identity & logotype", "Typography & colour systems", "Voice & tone", "Social & deck templates", "Usage guidelines", "Asset kits"],
    from: "from R75k",
    duration: "5–8 weeks",
  },
  {
    n: "04",
    title: "Motion & Interaction",
    lead: "The difference between nice and unforgettable.",
    body: "Scroll choreography, physics-based easing, micro-interactions that reward curiosity. Motion is never decoration here — it's how the interface explains itself. We also know when to sit still, which is most of the time, which is the point.",
    deliverables: ["Interaction design", "Scroll choreography (GSAP)", "Lottie & Rive", "WebGL / 3D scenes", "Prototype films", "Motion guidelines"],
    from: "from R60k",
    duration: "4–8 weeks",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A focused marketing site runs 8–12 weeks end to end; platforms and e-commerce run 12–16. We give you a real date in week one and we've never missed one. If we're slow, it's because your content is — we'll tell you early and often.",
  },
  {
    q: "What does a website actually cost?",
    a: "Most projects land between R95k and R350k depending on scope, with design+build for a serious marketing site typically around R180k. We quote fixed, itemised, no ambiguity — you'll know exactly what every rand buys before we start.",
  },
  {
    q: "WordPress, headless, or something else?",
    a: "We build most sites headless (React + Sanity/Payload) for speed and security, and Shopify Hydrogen for e-commerce. If your team already lives in WordPress and it's genuinely the right tool, we'll say so — and we'll introduce you to someone excellent for it.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Happily — about half our roster is founders betting their savings on getting it right. If the full build is more than you need right now, we'll design a phased route: brand + one extraordinary landing page first, the rest when revenue says go.",
  },
  {
    q: "What happens after launch?",
    a: "Every site ships with training, a care manual and 30 days of fixes on us. Most clients stay on a care plan (from R4,500/mo): updates, experiments, small improvements, priority support, and a human answering the phone.",
  },
];

export function Services() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePageTitle("Services — Sundowner Studio");

  return (
    <main ref={root} id="main" className="pt-28 md:pt-40">
      <header className="px-5 md:px-10 pb-12 md:pb-20">
        <p className="mono text-smoke mb-6 flex items-center gap-3" data-fade>
          <Asterisk className="w-3 h-3 text-amber" spin />
          INDEX <span className="text-amber">/</span> SERVICES <span className="text-amber">/</span> (04 + CARE PLANS)
        </p>
        <Reveal as="h1" className="display font-light leading-[0.85] tracking-[-0.04em] text-[clamp(3.2rem,12.5vw,13rem)]">
          <span>SERVICES</span>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-4 md:mt-6 md:items-end">
          <Reveal as="p" className="display italic font-light text-[clamp(1.4rem,3.8vw,3rem)] text-smoke leading-none">
            <span>priced honestly, argued loudly</span>
          </Reveal>
          <p className="mono text-smoke max-w-xs leading-relaxed" data-fade style={{ "--d": "300ms" } as React.CSSProperties}>
            ALL ENGAGEMENTS INCLUDE STRATEGY, QA, LAUNCH SUPPORT AND UNSOLICITED HONESTY.
          </p>
        </div>
      </header>

      {/* service blocks */}
      <section aria-label="Service details">
        {services.map((s, i) => (
          <article key={s.n} className="border-t border-line px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className="mono text-amber mb-4" data-fade>({s.n})</p>
              <Reveal as="h2" className="display font-light text-[clamp(2rem,4.6vw,4rem)] leading-[0.95] tracking-tight">
                <span>{s.title}</span>
              </Reveal>
              <div className="flex flex-wrap gap-2 mt-6" data-fade>
                <Chip className="text-bone border-amber/50">{s.from.toUpperCase()}</Chip>
                <Chip>{s.duration.toUpperCase()}</Chip>
              </div>
              <p className="display italic font-light text-lg md:text-xl text-smoke mt-8 max-w-xs" data-fade>
                {s.lead}
              </p>
            </div>
            <div className="md:col-span-4" data-fade>
              <p className="text-bone-dim leading-[1.75] text-[0.95rem] md:text-base">{s.body}</p>
            </div>
            <div className="md:col-span-4" data-fade style={{ "--d": "120ms" } as React.CSSProperties}>
              <p className="mono text-smoke mb-4">DELIVERABLES</p>
              <ul className="space-y-2.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm md:text-[0.95rem] text-bone">
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber shrink-0" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                data-cursor="link"
                className="mono inline-flex items-center gap-2 mt-8 text-amber hover:text-bone transition-colors"
              >
                START WITH THIS <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            {i === services.length - 1 && null}
          </article>
        ))}
      </section>

      {/* care plan strip */}
      <div className="border-t border-line px-5 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-ink-2/40" data-fade>
        <p className="display text-xl md:text-2xl tracking-tight">
          Ongoing care <span className="italic text-smoke">— from R4,500/mo.</span>
        </p>
        <p className="mono text-smoke max-w-md leading-relaxed">
          UPDATES · EXPERIMENTS · SMALL IMPROVEMENTS · A HUMAN ON THE PHONE
        </p>
        <ArrowLink to="/contact" className="text-amber">ASK ABOUT CARE PLANS</ArrowLink>
      </div>

      <Marquee big duration={26} items={["Strategy", "Design", "Code", "Content", "Motion", "Care"]} />

      {/* faq */}
      <section className="px-5 md:px-10 py-20 md:py-32" aria-label="Frequently asked questions">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHead index="SEC.02" label="FAIR QUESTIONS" className="md:sticky md:top-28" />
            <p className="mono text-smoke mt-6 md:sticky md:top-40 md:max-w-[12rem]" data-fade>
              ANSWERED BEFORE YOUR FINANCE DEPARTMENT ASKS
            </p>
          </div>
          <div className="md:col-span-8">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className={cn("group border-t border-line", i === faqs.length - 1 && "border-b")}
                data-fade
                style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
              >
                <summary
                  data-cursor="link"
                  className="flex items-center justify-between gap-6 py-6 md:py-7 list-none"
                >
                  <span className="display text-xl md:text-3xl tracking-tight group-hover:italic transition-all">
                    {f.q}
                  </span>
                  <Plus className="faq-icon w-5 h-5 md:w-6 md:h-6 shrink-0 text-amber transition-transform duration-500" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <div>
                    <p className="text-bone-dim leading-[1.75] text-[0.95rem] md:text-base max-w-2xl pb-7">
                      {f.a}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
