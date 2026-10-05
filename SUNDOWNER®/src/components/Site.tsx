import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, type Location } from "react-router-dom";
import Lenis from "lenis";
import { useReducedMotion } from "../lib/hooks";

type SiteCtx = {
  ready: boolean;
  setReady: (v: boolean) => void;
  stage: Location;
  lenis: React.MutableRefObject<Lenis | null>;
  busy: React.MutableRefObject<boolean>;
};

const Ctx = createContext<SiteCtx | null>(null);
export const useSite = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSite outside provider");
  return v;
};

const EASE = "cubic-bezier(.76,0,.24,1)";
const PANEL_DUR = 520;
const PANEL_STAGGER = 65;
const PANELS = 5;

export function SiteFrame({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [stage, setStage] = useState(location);
  const [ready, setReady] = useState(false);
  const busy = useRef(false);
  const lenis = useRef<Lenis | null>(null);
  const wipe = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const latest = useRef(location);
  latest.current = location;
  const reduced = useReducedMotion();

  /* ---------- smooth scroll ---------- */
  useEffect(() => {
    if (reduced) return;
    const l = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.current = l;
    let raf = 0;
    const loop = (time: number) => {
      l.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis.current = null;
    };
  }, [reduced]);

  /* clear pending transition timers on unmount */
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => clearTimeout(id));
  }, []);

  /* ---------- page transitions (CSS transitions + timeouts, no gsap) ---------- */
  useEffect(() => {
    if (location.pathname === stage.pathname) return;

    const doSwap = () => {
      try {
        setStage(latest.current);
      } catch {
        /* noop */
      }
      try {
        window.scrollTo(0, 0);
        lenis.current?.scrollTo(0, { immediate: true });
      } catch {
        /* noop */
      }
    };

    const el = wipe.current;
    const panels = el
      ? Array.from(el.querySelectorAll<HTMLElement>("[data-wipe-panel]"))
      : [];

    if (reduced || busy.current || !el || panels.length === 0) {
      doSwap();
      return;
    }

    busy.current = true;
    el.style.pointerEvents = "auto";

    // phase 1 — cover
    panels.forEach((p, i) => {
      p.style.transition = `transform ${PANEL_DUR}ms ${EASE}`;
      p.style.transitionDelay = `${i * PANEL_STAGGER}ms`;
      p.style.webkitTransform = "translateY(0%)";
      p.style.transform = "translateY(0%)";
    });

    const inTime = PANEL_DUR + (PANELS - 1) * PANEL_STAGGER + 40;
    const outTime = PANEL_DUR + 120 + (PANELS - 1) * PANEL_STAGGER + 40;

    const t1 = window.setTimeout(() => {
      doSwap();
      // let the new page mount behind the covered panels, then reveal
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panels.forEach((p, i) => {
            p.style.transition = `transform ${PANEL_DUR + 120}ms ${EASE}`;
            p.style.transitionDelay = `${
              (PANELS - 1 - i) * PANEL_STAGGER
            }ms`;
            p.style.transform = "translateY(-101%)";
          });
        });
      });
      const t2 = window.setTimeout(() => {
        panels.forEach((p) => {
          p.style.transition = "none";
          p.style.transitionDelay = "0ms";
          p.style.transform = "translateY(101%)";
        });
        el.style.pointerEvents = "none";
        busy.current = false;
      }, outTime);
      timers.current.push(t2);
    }, inTime);
    timers.current.push(t1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reduced]);

  return (
    <Ctx.Provider value={{ ready, setReady, stage, lenis, busy }}>
      {children}
      {/* page wipe overlay */}
      <div
        ref={wipe}
        aria-hidden="true"
        className="fixed inset-0 z-[60] pointer-events-none flex"
      >
        {Array.from({ length: PANELS }).map((_, i) => (
          <div
            key={i}
            data-wipe-panel
            className="relative flex-1 bg-ink border-r border-line will-change-transform"
            style={{ transform: "translateY(101%)" }}
          >
            {i === 0 && (
              <span className="absolute left-5 md:left-8 bottom-6 mono text-amber">
                SUNDOWNER®
              </span>
            )}
            {i === PANELS - 1 && (
              <span className="absolute right-5 md:right-8 top-24 mono text-smoke">
                CAPE TOWN, ZA
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-amber" />
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

/* Scroll to top helper */
export function useScrollTop() {
  const { lenis } = useSite();
  return () => {
    try {
      lenis.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    } catch {
      /* noop */
    }
  };
}
