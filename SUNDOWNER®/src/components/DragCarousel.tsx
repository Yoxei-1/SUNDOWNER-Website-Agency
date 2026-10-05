import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";
import { clamp, lerp, useReducedMotion } from "../lib/hooks";

export function DragCarousel({ items }: { items: Project[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const s = useRef({
    current: 0,
    target: 0,
    max: 0,
    dragging: false,
    startX: 0,
    startPos: 0,
    moved: 0,
    vel: 0,
    lastX: 0,
    lastT: 0,
  });

  useEffect(() => {
    const vp = viewport.current!;
    const tr = track.current!;
    const st = s.current;

    const measure = () => {
      st.max = Math.max(0, tr.scrollWidth - vp.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!st.dragging) {
        st.target += st.vel;
        st.vel *= 0.93;
        st.target = clamp(st.target, 0, st.max);
        st.current = lerp(st.current, st.target, 0.085);
      } else {
        st.current = lerp(st.current, st.target, 0.42);
      }
      // rubber band render
      const shown =
        st.current < 0
          ? st.current * 0.35
          : st.current > st.max
          ? st.max + (st.current - st.max) * 0.35
          : st.current;
      tr.style.transform = `translate3d(${-shown}px,0,0)`;
      if (bar.current)
        bar.current.style.transform = `scaleX(${st.max ? clamp(shown / st.max, 0, 1) : 0})`;

      // per-card parallax
      const vw = window.innerWidth;
      tr.querySelectorAll<HTMLElement>("[data-card-img]").forEach((img) => {
        const r = img.parentElement!.getBoundingClientRect();
        const offset = (r.left + r.width / 2 - vw / 2) * -0.055;
        img.style.transform = `translate3d(${offset.toFixed(1)}px,0,0) scale(1.18)`;
      });
    };
    if (reduced) {
      // simple clamped render on scroll only
      st.current = 0;
    }
    raf = requestAnimationFrame(loop);

    const onDown = (e: PointerEvent) => {
      st.dragging = true;
      st.startX = e.clientX;
      st.startPos = st.target;
      st.moved = 0;
      st.vel = 0;
      st.lastX = e.clientX;
      st.lastT = performance.now();
      vp.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!st.dragging) return;
      const dx = e.clientX - st.startX;
      st.moved = Math.max(st.moved, Math.abs(dx));
      st.target = st.startPos - dx;
      const now = performance.now();
      const dt = Math.max(1, now - st.lastT);
      st.vel = ((st.lastX - e.clientX) / dt) * 14;
      st.lastX = e.clientX;
      st.lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!st.dragging) return;
      st.dragging = false;
      st.target = clamp(st.target, 0, st.max);
      if (vp.hasPointerCapture(e.pointerId)) vp.releasePointerCapture(e.pointerId);
    };
    const onWheel = (e: WheelEvent) => {
      if (st.max <= 0) return;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const next = st.target + d;
      if (next > 0 && next < st.max) {
        e.preventDefault();
        e.stopPropagation();
        st.vel = 0;
        st.target = next;
      }
    };

    vp.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    vp.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vp.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      vp.removeEventListener("wheel", onWheel);
    };
  }, [reduced]);

  const nudge = (dir: number) => {
    const st = s.current;
    st.vel = 0;
    st.target = clamp(
      st.target + dir * (viewport.current?.clientWidth ?? 600) * 0.62,
      0,
      st.max
    );
  };

  return (
    <div className="relative" data-cursor="drag">
      <div
        ref={viewport}
        className="overflow-hidden select-none py-2"
        style={{ touchAction: "pan-y" }}
        role="region"
        aria-label="Draggable project showcase"
      >
        <div
          ref={track}
          className="flex gap-4 md:gap-6 w-max will-change-transform pl-5 md:pl-10 pr-5 md:pr-10"
        >
          {items.map((p, i) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              draggable={false}
              onClick={(e) => {
                if (s.current.moved > 10) e.preventDefault();
              }}
              className="group block w-[74vw] sm:w-[46vw] lg:w-[32rem] shrink-0"
              aria-label={`${p.name} — ${p.category}, ${p.year}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-ink-2">
                <img
                  data-card-img
                  src={p.cover}
                  alt={p.coverAlt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover scale-[1.18] transition-[filter] duration-700 group-hover:saturate-125 will-change-transform"
                />
                <span className="absolute top-3 left-3 mono text-bone bg-ink/75 px-2.5 py-1.5 border border-line">
                  0{i + 1} <span className="text-amber">/</span> 0{items.length}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-ink via-ink/55 to-transparent flex items-end justify-between gap-3">
                  <span className="display text-2xl md:text-[1.7rem] leading-none tracking-tight group-hover:italic transition-all duration-300">
                    {p.name}
                  </span>
                  <span className="mono text-bone-dim text-right leading-relaxed">
                    {p.category}
                    <br />
                    <span className="text-amber">{p.year}</span>
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center gap-5 px-5 md:px-10 mt-6">
        <div className="flex gap-2">
          <button
            onClick={() => nudge(-1)}
            aria-label="Previous projects"
            data-cursor="link"
            className="w-11 h-11 border border-line grid place-items-center text-bone-dim hover:border-amber hover:text-amber transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Next projects"
            data-cursor="link"
            className="w-11 h-11 border border-line grid place-items-center text-bone-dim hover:border-amber hover:text-amber transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="h-px flex-1 bg-line relative overflow-hidden">
          <div
            ref={bar}
            className="absolute inset-0 bg-amber origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span className="mono text-smoke hidden sm:block">DRAG TO EXPLORE</span>
      </div>
    </div>
  );
}
