import { Link, useLocation } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import { useClock, useReducedMotion } from "../lib/hooks";
import { ArrowLink, Asterisk } from "./ui";

const nextMap: { match: (p: string) => boolean; to: string; label: string }[] = [
  { match: (p) => p === "/", to: "/work", label: "Work" },
  { match: (p) => p.startsWith("/work"), to: "/studio", label: "Studio" },
  { match: (p) => p.startsWith("/studio"), to: "/services", label: "Services" },
  { match: (p) => p.startsWith("/services"), to: "/contact", label: "Contact" },
  { match: () => true, to: "/", label: "Index" },
];

const sitemap = [
  { to: "/", label: "Index" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  const location = useLocation();
  const time = useClock();
  const reduced = useReducedMotion();
  const next = nextMap.find((n) => n.match(location.pathname))!;

  return (
    <footer className="relative border-t border-line bg-ink overflow-hidden">
      {/* next page teaser */}
      <Link
        to={next.to}
        data-cursor="link"
        className="group relative block px-5 md:px-10 py-16 md:py-24 border-b border-line overflow-hidden"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="mono text-smoke mb-4 flex items-center gap-3">
              <Asterisk className="w-3 h-3 text-amber" spin /> NEXT PAGE
            </p>
            <span className="display block text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
              {next.label}
              <span className="italic text-amber">.</span>
            </span>
          </div>
          <ArrowDownRight
            aria-hidden="true"
            className="w-12 h-12 md:w-24 md:h-24 shrink-0 text-smoke transition-all duration-500 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:text-amber group-hover:translate-x-2 group-hover:translate-y-2 group-hover:scale-110"
          />
        </div>
        {!reduced && (
          <span className="absolute inset-0 bg-amber/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        )}
      </Link>

      {/* sitemap */}
      <div className="px-5 md:px-10 py-14 md:py-20 grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-6">
        <div className="md:col-span-4">
          <p className="mono text-smoke mb-5">Menu</p>
          <ul className="space-y-2.5">
            {sitemap.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  data-cursor="link"
                  className="text-xl md:text-2xl display tracking-tight hover:text-amber hover:italic transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="mono text-smoke mb-5">Socials</p>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <ArrowLink to={s.href} external className="text-bone-dim hover:text-bone">
                  {s.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5">
          <p className="mono text-smoke mb-5">Contact</p>
          <a
            href="mailto:hello@sundowner.studio"
            data-cursor="link"
            className="display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight tracking-tight hover:text-amber transition-colors"
          >
            hello@sundowner.studio
          </a>
          <p className="mt-5 text-sm text-bone-dim leading-relaxed max-w-xs">
            47 Albert Rd, Woodstock, Cape Town 7915
            <br />
            +27 (0)21 447 0219
          </p>
          <p className="mt-6 mono text-smoke" suppressHydrationWarning>
            CPT {time} SAST — 33.9249°S, 18.4241°E
          </p>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="relative px-5 md:px-10 pb-6 md:pb-8 select-none" aria-hidden="true">
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(255,90,31,0.1), transparent 70%)",
          }}
        />
        <div className="relative display font-light text-[clamp(3rem,11.6vw,13rem)] leading-[0.82] tracking-[-0.045em] whitespace-nowrap text-bone/95 flex items-end justify-between">
          <span>SUNDOWNER</span>
          <Asterisk className="w-[0.5em] h-[0.5em] text-amber mb-[0.08em]" spin />
        </div>
      </div>

      <div className="px-5 md:px-10 py-5 border-t border-line flex flex-col sm:flex-row justify-between gap-2 mono text-smoke">
        <span>© 2026 SUNDOWNER STUDIO (PTY) LTD</span>
        <span className="flex items-center gap-2">
          <Asterisk className="w-3 h-3 text-amber" /> MADE WITH TROUBLE IN CAPE TOWN
        </span>
      </div>
    </footer>
  );
}
