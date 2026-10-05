import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useReducedMotion } from "../lib/hooks";

/* ---------------- shared card frame ---------------- */
function LabCard({
  n,
  title,
  desc,
  children,
  live = true,
}: {
  n: string;
  title: string;
  desc: string;
  children: ReactNode;
  live?: boolean;
}) {
  return (
    <figure className="group border border-line bg-ink-2 overflow-hidden flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden">{children}</div>
      <figcaption className="border-t border-line p-5 flex-1">
        <p className="mono flex items-center gap-2 mb-2">
          <span className="text-amber">{n}</span>
          {live && (
            <span className="flex items-center gap-1.5 text-smoke">
              <i className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              LIVE CANVAS
            </span>
          )}
        </p>
        <p className="display text-xl tracking-tight">{title}</p>
        <p className="text-sm text-smoke mt-2 leading-relaxed">{desc}</p>
      </figcaption>
    </figure>
  );
}

/* runs a canvas animation while visible */
function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pointer: { x: number; y: number; in: boolean }) => boolean | void,
  opts?: { once?: boolean }
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pointer = { x: -9999, y: -9999, in: false };
    let raf = 0;
    let running = true;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (e) => {
        running = e[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.in = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height;
    };
    canvas.addEventListener("pointermove", onMove, { passive: true });

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      const r = canvas.getBoundingClientRect();
      draw(ctx, r.width, r.height, (now - t0) / 1000, pointer);
    };
    if (reduced || opts?.once) {
      const r = canvas.getBoundingClientRect();
      draw(ctx, r.width, r.height, 0, pointer);
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return ref;
}

/* ---------------- LAB 01: flow field ---------------- */
function FlowField() {
  const parts = useRef<{ x: number; y: number; px: number; py: number; s: number }[]>([]);

  const ref = useCanvas((ctx, w, h, t, p) => {
    if (parts.current.length === 0) {
      const n = Math.floor((w * h) / 2600);
      for (let i = 0; i < n; i++)
        parts.current.push({ x: Math.random() * w, y: Math.random() * h, px: 0, py: 0, s: Math.random() });
      ctx.fillStyle = "#0B0A08";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.fillStyle = "rgba(11,10,8,0.075)";
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1.1;
    const set = parts.current;
    for (const pt of set) {
      pt.px = pt.x;
      pt.py = pt.y;
      const a =
        (Math.sin(pt.x * 0.006 + t * 0.6) + Math.cos(pt.y * 0.005 - t * 0.4)) * Math.PI;
      let vx = Math.cos(a) * 1.5;
      let vy = Math.sin(a) * 1.5;
      if (p.in) {
        const dx = p.x - pt.x;
        const dy = p.y - pt.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150 && d2 > 1) {
          const f = 60 / d2;
          vx -= dx * f;
          vy -= dy * f;
        }
      }
      pt.x += vx + (pt.s - 0.5) * 0.6;
      pt.y += vy + (pt.s - 0.5) * 0.6;
      if (pt.x < -8 || pt.x > w + 8 || pt.y < -8 || pt.y > h + 8) {
        pt.x = Math.random() * w;
        pt.y = Math.random() * h;
        pt.px = pt.x;
        pt.py = pt.y;
        continue;
      }
      ctx.strokeStyle =
        pt.s > 0.86 ? "rgba(237,231,218,0.5)" : "rgba(255,90,31,0.34)";
      ctx.beginPath();
      ctx.moveTo(pt.px, pt.py);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    }
  });
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-label="Generative flow field of amber particles resembling dusk light" role="img" />;
}

/* ---------------- LAB 02: halftone sun ---------------- */
function HalftoneSun() {
  const state = useRef({ cy: 0, cx: 0 });

  const ref = useCanvas((ctx, w, h, t, p) => {
    ctx.fillStyle = "#0B0A08";
    ctx.fillRect(0, 0, w, h);
    const s = state.current;
    const targetCy = p.in ? h * 0.28 + (p.y / h) * h * 0.5 : h * 0.72 + Math.sin(t * 0.5) * h * 0.06;
    const targetCx = p.in ? p.x : w / 2;
    s.cy += (targetCy - (s.cy || targetCy)) * 0.06;
    s.cx += (targetCx - (s.cx || targetCx)) * 0.06;
    const R = Math.min(w, h) * 0.3;
    const gap = Math.max(10, w / 34);
    for (let gy = gap / 2; gy < h; gy += gap) {
      for (let gx = gap / 2; gx < w; gx += gap) {
        const dx = gx - s.cx;
        const dy = gy - s.cy;
        const d = Math.hypot(dx, dy);
        const band = Math.exp(-Math.pow((d - R) / (gap * 1.8), 2));
        const flick = 0.6 + 0.4 * Math.sin(t * 2 + (dx + dy) * 0.05);
        let r = 0.8 + band * gap * 0.32 * flick;
        let fill = "rgba(237,231,218,0.13)";
        if (d < R) {
          const inner = 1 - d / R;
          r = 1 + inner * gap * 0.42;
          fill = inner > 0.55 ? "rgba(255,90,31,0.95)" : "rgba(255,138,92,0.8)";
        } else if (band > 0.25) {
          fill = `rgba(255,90,31,${0.25 + band * 0.5})`;
        }
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(gx, gy, Math.max(0.4, r), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // horizon hairline
    ctx.fillStyle = "rgba(237,231,218,0.25)";
    ctx.fillRect(0, h - 1, w, 1);
  });
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-label="Halftone dot sun that rises toward your cursor" role="img" />;
}

/* ---------------- LAB 03: grain study (pure CSS) ---------------- */
function GrainStudy() {
  return (
    <div className="absolute inset-0 overflow-hidden" role="img" aria-label="Layered gradients and animated film grain in the brand palette">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(255,90,31,0.55), transparent 60%), radial-gradient(ellipse 60% 45% at 20% 0%, rgba(237,231,218,0.08), transparent 70%), #0B0A08",
        }}
      />
      <div
        className="absolute inset-[-60%] opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,90,31,0.12) 40deg, transparent 90deg, transparent 200deg, rgba(237,231,218,0.06) 260deg, transparent 320deg)",
          animation: "spin 22s linear infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
          opacity: 0.7,
        }}
      />
      <span className="absolute bottom-4 left-4 mono text-smoke/80">Nº7 — GRAIN / EMBER / BONE</span>
    </div>
  );
}

/* ---------------- section ---------------- */
export function ArtLab({ className }: { className?: string }) {
  return (
    <div className={cn("grid md:grid-cols-3 gap-4 md:gap-5", className)}>
      <LabCard n="LAB_01" title="Golden hour, computed" desc={labCopy[0]}>
        <FlowField />
      </LabCard>
      <LabCard n="LAB_02" title="Halftone horizon" desc={labCopy[1]}>
        <HalftoneSun />
      </LabCard>
      <LabCard n="LAB_03" title="Grain study Nº7" desc={labCopy[2]} live={false}>
        <GrainStudy />
      </LabCard>
    </div>
  );
}

/* descriptions used separately */
export const labCopy = [
  "4,000 particles chasing a moving sun. Your cursor is weather.",
  "A dithered sun that rises when you lean in. Go on, lean in.",
  "No canvas, no JavaScript — just gradients and stubbornness.",
];
