import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../lib/hooks";
import { Asterisk } from "./ui";
import { cn } from "../utils/cn";

const stack = [
  "/images/intro-1.jpg",
  "/images/intro-2.jpg",
  "/images/intro-3.jpg",
  "/images/intro-4.jpg",
];

export function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const [gone, setGone] = useState(false);
  const reduced = useReducedMotion();

  // lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // image cycle
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % stack.length), 300);
    return () => clearInterval(id);
  }, [reduced]);

  // counter
  useEffect(() => {
    let v = 0;
    const id = setInterval(
      () => {
        v = Math.min(100, v + (reduced ? 25 : Math.floor(Math.random() * 6) + 2));
        setProgress(v);
        if (v >= 100) clearInterval(id);
      },
      reduced ? 60 : 46
    );
    return () => clearInterval(id);
  }, [reduced]);

  // progress bar
  useEffect(() => {
    if (bar.current) bar.current.style.transform = `scaleX(${progress / 100})`;
  }, [progress]);

  // exit
  useEffect(() => {
    if (progress < 100) {
      // pre-warm hero images
      stack.forEach((s) => {
        const im = new Image();
        im.src = s;
      });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: reduced ? 0.1 : 0.45,
        onComplete: () => setGone(true),
      });
      tl.to("[data-load-inner]", {
        yPercent: -26,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
        stagger: 0.05,
      })
        .to(
          root.current,
          {
            yPercent: -100,
            duration: reduced ? 0.35 : 0.95,
            ease: "power4.inOut",
          },
          "-=0.15"
        )
        // hero starts while the curtain is still lifting
        .call(onReveal, [], reduced ? "-=0.3" : "-=0.75");
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] bg-ink flex flex-col justify-between overflow-hidden"
      role="status"
      aria-label="Loading Sundowner"
    >
      <div data-load-inner className="flex justify-between items-start p-6 md:p-10">
        <span className="mono text-smoke">SUNDOWNER® STUDIO</span>
        <span className="mono text-smoke flex items-center gap-2">
          <Asterisk className="w-3 h-3 text-amber" spin /> CAPE TOWN, ZA
        </span>
      </div>

      {/* stacked intro images */}
      <div data-load-inner className="absolute inset-0 grid place-items-center">
        <div className="relative w-[52vw] max-w-[300px] md:max-w-[360px] aspect-[4/5]">
          {stack.map((s, i) => (
            <img
              key={s}
              src={s}
              alt=""
              className={cn(
                "absolute inset-0 w-full h-full object-cover border border-line transition-opacity duration-300",
                i === frame ? "opacity-100" : "opacity-0"
              )}
              style={{ transform: `rotate(${(i - 1.5) * 2.4}deg)` }}
            />
          ))}
        </div>
      </div>

      <div data-load-inner className="flex justify-between items-end p-6 md:p-10 relative z-10">
        <p className="mono text-smoke max-w-[16rem] leading-relaxed">
          CAPE TOWN — SETTING THE LIGHT
          <br />
          <span className="text-amber">{String(progress).padStart(3, "0")}%</span>
        </p>
        <div
          className="display italic font-light text-[clamp(4.5rem,14vw,11rem)] leading-[0.8] text-bone tabular-nums"
          aria-hidden="true"
        >
          {progress}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-line">
        <div
          ref={bar}
          className="h-full bg-amber origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
