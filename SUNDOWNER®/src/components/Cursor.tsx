import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "../lib/hooks";
import { cn } from "../utils/cn";

type Mode = "default" | "link" | "view" | "drag" | "text";

const labels: Record<string, string> = { view: "VIEW", drag: "DRAG" };

export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-cursor");
      return;
    }
    document.documentElement.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setMode((tagged.dataset.cursor as Mode) || "default");
        return;
      }
      if (t.closest("input, textarea, select")) setMode("text");
      else if (t.closest('a, button, summary, [role="button"]')) setMode("link");
      else setMode("default");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current)
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const labelled = mode === "view" || mode === "drag";

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className={cn(
          "fixed top-0 left-0 z-[90] pointer-events-none rounded-full bg-amber transition-opacity duration-300",
          visible && !labelled && mode !== "text" ? "opacity-100" : "opacity-0",
          mode === "link" ? "w-2.5 h-2.5" : "w-1.5 h-1.5"
        )}
      />
      <div
        ref={ring}
        aria-hidden="true"
        className={cn(
          "fixed top-0 left-0 z-[89] pointer-events-none transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(.22,.9,.24,1)]",
            labelled
              ? "w-[5.5rem] h-[5.5rem] bg-amber text-ink"
              : mode === "link"
              ? "w-14 h-14 border border-amber/70 bg-amber/10"
              : mode === "text"
              ? "w-8 h-8 border border-bone/30 opacity-60"
              : "w-9 h-9 border border-bone/35",
            pressed && "scale-75"
          )}
        >
          {labelled && (
            <span className="mono !text-[0.6rem] text-ink font-bold">
              {labels[mode]}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
