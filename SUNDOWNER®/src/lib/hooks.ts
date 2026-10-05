import { useEffect, useState } from "react";

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useFinePointer() {
  const [fine, setFine] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const fn = () => setFine(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return fine;
}

/** Live Cape Town (SAST) clock, HH:MM:SS */
export function useClock(tz = "Africa/Johannesburg") {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

/**
 * IntersectionObserver-driven reveal: adds .is-in to every
 * [data-reveal], [data-fade], [data-wipe], [data-grow] inside the scope.
 */
export function useReveal<T extends HTMLElement>(scope: React.RefObject<T | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    const els = root.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-fade], [data-wipe], [data-grow]"
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scope]);
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Sundowner® — Web Design Studio, Cape Town";
    };
  }, [title]);
}
