import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useClock } from "../lib/hooks";
import { useSite } from "./Site";
import { Asterisk } from "./ui";
import { cn } from "../utils/cn";

const links = [
  { to: "/", label: "Index", n: "01" },
  { to: "/work", label: "Work", n: "02" },
  { to: "/studio", label: "Studio", n: "03" },
  { to: "/services", label: "Services", n: "04" },
  { to: "/contact", label: "Contact", n: "05" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const time = useClock();
  const { lenis } = useSite();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // close menu on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  // mount/unmount choreography
  useEffect(() => {
    if (open) {
      clearTimeout(closeTimer.current);
      setMounted(true);
      lenis.current?.stop();
      document.body.style.overflow = "hidden";
    } else {
      closeTimer.current = setTimeout(() => setMounted(false), 750);
      lenis.current?.start();
      document.body.style.overflow = "";
    }
    return () => clearTimeout(closeTimer.current);
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[70] transition-all duration-500",
          scrolled && !open
            ? "bg-ink/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-[4.25rem] md:h-[4.75rem]">
          <Link
            to="/"
            data-cursor="link"
            className="flex items-center gap-2 group"
            aria-label="Sundowner — home"
          >
            <Asterisk className="w-4 h-4 text-amber transition-transform duration-700 group-hover:rotate-180" />
            <span className="font-sans font-bold tracking-[0.02em] text-sm md:text-base">
              SUNDOWNER
              <span className="text-amber align-super text-[0.55em] ml-0.5">®</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            <span className="mono text-smoke hidden md:block" suppressHydrationWarning>
              CPT {time} SAST
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="link"
              className="group flex items-center gap-3 py-2"
            >
              <span className="mono text-bone hidden sm:block">
                {open ? "CLOSE" : "MENU"}
              </span>
              <span className="relative w-8 h-3 block">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-bone transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
                    open && "top-1/2 rotate-[20deg] bg-amber",
                    !open && "group-hover:w-3/4"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-px w-full bg-bone transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
                    open && "bottom-1/2 -rotate-[20deg] bg-amber",
                    !open && "group-hover:w-3/4 group-hover:ml-auto"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mounted && (
        <div
          className="fixed inset-0 z-[60] bg-ink"
          style={{
            clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            transition: "clip-path 0.75s cubic-bezier(.76,0,.24,1)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="h-full flex flex-col justify-between pt-28 md:pt-32 px-5 md:px-10 pb-8 md:pb-10">
            <nav aria-label="Primary">
              <ul>
                {links.map((l, i) => (
                  <li
                    key={l.to}
                    className="border-b border-line first:border-t overflow-hidden"
                  >
                    <Link
                      to={l.to}
                      data-cursor="link"
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 md:gap-8 py-4 md:py-5"
                      style={{
                        transform: open ? "translateY(0)" : "translateY(110%)",
                        opacity: open ? 1 : 0,
                        transition: `transform 0.8s cubic-bezier(.22,.9,.24,1) ${140 + i * 70}ms, opacity 0.6s ease ${140 + i * 70}ms`,
                      }}
                    >
                      <span className="mono text-smoke group-hover:text-amber transition-colors duration-300">
                        {l.n}
                      </span>
                      <span className="display text-[clamp(2.6rem,8.5vw,6.5rem)] leading-[1.02] tracking-tight transition-all duration-500 ease-[cubic-bezier(.22,.9,.24,1)] group-hover:translate-x-4 md:group-hover:translate-x-8 group-hover:italic">
                        {l.label}
                      </span>
                      {isActive(l.to) && (
                        <Asterisk className="w-4 h-4 md:w-6 md:h-6 text-amber self-center" spin />
                      )}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="w-7 h-7 md:w-10 md:h-10 ml-auto self-center text-smoke opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:text-amber"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(16px)",
                transition: "all 0.7s cubic-bezier(.22,.9,.24,1) 480ms",
              }}
            >
              <div>
                <p className="mono text-smoke mb-3">New business</p>
                <a
                  href="mailto:hello@sundowner.studio"
                  data-cursor="link"
                  className="text-sm md:text-base underline-offset-4 hover:text-amber hover:underline transition-colors"
                >
                  hello@sundowner.studio
                </a>
              </div>
              <div>
                <p className="mono text-smoke mb-3">Socials</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                        className="group text-sm inline-flex items-center gap-1 text-bone-dim hover:text-amber transition-colors"
                      >
                        {s.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="mono text-smoke mb-3">Studio</p>
                <p className="text-sm text-bone-dim leading-relaxed">
                  47 Albert Rd, Woodstock
                  <br />
                  Cape Town, 7915 — ZA
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
