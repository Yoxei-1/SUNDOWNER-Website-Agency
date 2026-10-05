import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useFinePointer, useReducedMotion } from "../lib/hooks";
import type { Project } from "../data/projects";
import { cn } from "../utils/cn";

/* ---------------- Asterisk mark ---------------- */
export function Asterisk({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("shrink-0", spin && "animate-spin-slow", className)}
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      >
        <path d="M32 13v38" />
        <path d="M15.5 22.5l33 19" />
        <path d="M48.5 22.5l-33 19" />
      </g>
    </svg>
  );
}

/* ---------------- Line reveal ---------------- */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delayStep = 95,
}: {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span" | "blockquote";
  children: ReactNode;
  className?: string;
  delayStep?: number;
}) {
  const kids = Children.toArray(children);
  return (
    <Tag data-reveal className={className}>
      {kids.map((k, i) => (
        <span className="rl" key={i}>
          <span
            className="rl-i"
            style={{ "--i": i, transitionDelay: `${i * delayStep}ms` } as CSSProperties}
          >
            {k}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  index,
  label,
  right,
  className,
}: {
  index: string;
  label: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-4 md:gap-6", className)}>
      <div className="flex items-center gap-3">
        <Asterisk className="w-3.5 h-3.5 text-amber" spin />
        <span className="mono text-amber">{index}</span>
        <span className="mono text-smoke">{label}</span>
      </div>
      <div className="h-px flex-1 bg-line mb-2" data-grow />
      {right && <div className="mono text-smoke mb-0.5">{right}</div>}
    </div>
  );
}

/* ---------------- Arrow link ---------------- */
export function ArrowLink({
  to,
  children,
  className,
  external = false,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:scale-x-100" />
      </span>
      <ArrowUpRight
        className="w-[1em] h-[1em] transition-transform duration-500 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </>
  );
  const cls = cn("group inline-flex items-center gap-2 mono", className);
  if (external || to.startsWith("http")) {
    return (
      <a href={to} className={cls} data-cursor="link" target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {inner}
      </a>
    );
  }
  if (to.startsWith("mailto")) {
    return (
      <a href={to} className={cls} data-cursor="link">
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} data-cursor="link">
      {inner}
    </Link>
  );
}

/* ---------------- Parallax image ---------------- */
export function Parallax({
  src,
  alt,
  className,
  imgClassName,
  speed = 0.14,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  eager?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const loop = () => {
      const el = wrap.current;
      const im = img.current;
      if (el && im) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom > -80 && r.top < vh + 80) {
          const progress = r.top + r.height / 2 - vh / 2;
          im.style.transform = `translate3d(0, ${(
            -progress * speed
          ).toFixed(2)}px, 0) scale(1.18)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, speed]);

  return (
    <div ref={wrap} className={cn("overflow-hidden relative", className)}>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full object-cover will-change-transform",
          reduced ? "scale-105" : "scale-[1.18]",
          imgClassName
        )}
      />
    </div>
  );
}

/* ---------------- Count up ---------------- */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m || value.includes(":")) {
      el.textContent = value;
      return;
    }
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(",", ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        if (reduced) {
          el.textContent = value;
          return;
        }
        const t0 = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = `${pre}${(target * eased).toFixed(decimals)}${post}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduced]);

  return (
    <span ref={ref} className={className}>
     {"\u00A0"}
    </span>
  );
}

/* ---------------- Project rows + floating preview ---------------- */
export function ProjectRows({
  items,
  className,
}: {
  items: Project[];
  className?: string;
}) {
  const fine = useFinePointer();
  const [active, setActive] = useState<Project | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!fine) return;
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.11;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.11;
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${(mouse.current.x - pos.current.x) * 0.045}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [fine]);

  return (
    <div
      className={cn("relative", className)}
      onPointerMove={(e) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul>
        {items.map((p, i) => (
          <li key={p.slug}>
            <Link
              to={`/work/${p.slug}`}
              data-cursor="view"
              onPointerEnter={() => setActive(p)}
              className={cn(
                "group grid grid-cols-12 items-baseline gap-x-3 md:gap-x-6 py-7 md:py-9 border-t border-line relative",
                i === items.length - 1 && "border-b"
              )}
            >
              <span className="mono text-smoke col-span-2 md:col-span-1 transition-colors duration-300 group-hover:text-amber">
                0{i + 1}
              </span>
              <span className="col-span-9 md:col-span-5 display text-[clamp(1.9rem,4.4vw,4.2rem)] leading-[0.95] tracking-tight transition-transform duration-500 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:translate-x-3 md:group-hover:translate-x-6">
                {p.name}
                <span className="italic text-smoke font-light text-[0.42em] tracking-normal ml-3 hidden lg:inline-block align-middle opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {p.tagline}
                </span>
              </span>
              <span className="hidden md:block col-span-5 mono text-smoke leading-loose">
                {p.role} <span className="text-amber">/</span> {p.timeline}
                <br />
                {p.year} <span className="text-amber">/</span> {p.team}
              </span>
              <span className="col-span-1 justify-self-end self-center">
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-6 h-6 md:w-8 md:h-8 text-smoke transition-all duration-500 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:text-amber group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fine && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={cn(
            "fixed top-0 left-0 z-20 w-[17rem] h-[21rem] pointer-events-none hidden md:block",
            "transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="relative w-full h-full overflow-hidden bg-ink-2 border border-line">
            {items.map((p) => (
              <img
                key={p.slug}
                src={p.cover}
                alt=""
                loading="lazy"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                  active?.slug === p.slug ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
            <span className="absolute bottom-2 left-2 mono text-ink bg-amber px-2 py-1">
              {active?.category ?? ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Meta chip ---------------- */
export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-2 border border-line px-3 py-1.5 text-smoke",
        className
      )}
    >
      {children}
    </span>
  );
}
