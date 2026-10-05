import type { Project } from "../data/projects";
import { cn } from "../utils/cn";

/**
 * Code-art "live preview" — a mini website built in JSX per client,
 * framed in a browser chrome. No raster mockups needed.
 */
export function MockWindow({ project, className }: { project: Project; className?: string }) {
  return (
    <figure className={cn("border border-line bg-ink-2", className)}>
      {/* chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="w-2.5 h-2.5 rounded-full bg-ink-3 border border-line block" />
          <i className="w-2.5 h-2.5 rounded-full bg-ink-3 border border-line block" />
          <i className="w-2.5 h-2.5 rounded-full bg-amber/70 block" />
        </span>
        <span className="mono text-smoke bg-ink px-3 py-1 rounded-full border border-line truncate">
          https://{project.url}
        </span>
        <span className="mono text-amber ml-auto hidden sm:block">LIVE PREVIEW — REBUILT IN CODE</span>
      </div>
      <div className="aspect-[16/10] overflow-hidden relative bg-ink">
        {project.mockVariant === "dashboard" && <MockDashboard project={project} />}
        {project.mockVariant === "editorial" && <MockEditorial project={project} />}
        {project.mockVariant === "commerce" && <MockCommerce project={project} />}
        {project.mockVariant === "music" && <MockMusic project={project} />}
        {project.mockVariant === "hotel" && <MockHotel project={project} />}
      </div>
    </figure>
  );
}

function MockNav({ name, dark = true }: { name: string; dark?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-[5%] py-[2.2%]", dark ? "bg-ink/90" : "bg-bone")}>
      <span className={cn("display text-[1.05vw] font-semibold tracking-tight", dark ? "text-bone" : "text-ink")}>
        {name}
      </span>
      <span className="flex gap-[1.2vw]">
        {["Work", "About", "Journal", "Contact"].map((l) => (
          <i key={l} className={cn("block h-[0.16vw] rounded-full", dark ? "bg-bone/30" : "bg-ink/30", l === "Contact" ? "w-[0.6vw] bg-amber" : "w-[1vw]")} />
        ))}
      </span>
    </div>
  );
}

function MockDashboard({ project }: { project: Project }) {
  return (
    <div className="w-full h-full flex text-left">
      <div className="w-[16%] border-r border-line bg-ink-2 p-[2%] hidden sm:block">
        <div className="display text-[1vw] text-bone mb-[14%]">Meridian<span className="text-amber">.</span></div>
        {["Portfolio", "Advisors", "Reports", "Vault", "Settings"].map((l, i) => (
          <div key={l} className={cn("mono !text-[0.55vw] !tracking-[0.1em] mb-[10%] flex items-center gap-[0.6vw]", i === 0 ? "text-amber" : "text-smoke")}>
            <i className={cn("w-[0.4vw] h-[0.4vw] rounded-full", i === 0 ? "bg-amber" : "bg-line")} />
            {l}
          </div>
        ))}
      </div>
      <div className="flex-1 p-[3%] bg-gradient-to-br from-ink to-ink-2">
        <div className="mono !text-[0.55vw] text-smoke mb-[1%]">TOTAL VALUE — 09:42 SAST</div>
        <div className="display text-[2.6vw] text-bone leading-none">
          R <span className="italic text-amber">418.6</span>m
        </div>
        <svg viewBox="0 0 300 70" className="w-full h-[38%] mt-[3%]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="mfade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,58 C28,54 40,38 62,40 C84,42 96,58 118,52 C140,46 150,20 176,22 C202,24 210,44 234,36 C258,28 268,10 300,8 L300,70 L0,70 Z" fill="url(#mfade)" />
          <path d="M0,58 C28,54 40,38 62,40 C84,42 96,58 118,52 C140,46 150,20 176,22 C202,24 210,44 234,36 C258,28 268,10 300,8" fill="none" stroke="#FF5A1F" strokeWidth="1.4" />
          {[{x:176,y:22},{x:234,y:36},{x:300,y:8}].map((p,i)=>(
            <circle key={i} cx={p.x} cy={p.y} r="2.4" fill="#0B0A08" stroke="#FF5A1F" strokeWidth="1.4" />
          ))}
        </svg>
        <div className="grid grid-cols-3 gap-[2%] mt-[3%]">
          {project.results.map((r) => (
            <div key={r.label} className="border border-line p-[6%] bg-ink/60">
              <div className="display text-[1.2vw] text-amber">{r.value}</div>
              <div className="mono !text-[0.5vw] text-smoke mt-[4%]">{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockEditorial({ project }: { project: Project }) {
  return (
    <div className="w-full h-full bg-ink text-left flex">
      <div className="w-[54%] p-[4%] flex flex-col justify-between">
        <MockNav name="Obsidian" />
        <div>
          <div className="mono !text-[0.55vw] text-amber mb-[3%]">MONOGRAPH Nº07 — CAPE TOWN</div>
          <div className="display text-[3.2vw] leading-[0.94] text-bone tracking-tight">
            Buildings that<br /><span className="italic text-smoke">hold their</span><br />silence.
          </div>
        </div>
        <div className="flex justify-between mono !text-[0.55vw] text-smoke border-t border-line pt-[3%]">
          <span>OBSIDIAN WORKS</span><span>EST. 2011</span><span>↓ SCROLL</span>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img src={project.cover} alt="" className="w-full h-full object-cover scale-105" />
        <span className="absolute bottom-[4%] left-[6%] mono !text-[0.55vw] text-bone bg-ink/70 px-[1.5%] py-[1%]">FIG.01 — PLATE 12, CAST CONCRETE</span>
      </div>
    </div>
  );
}

function MockCommerce({ project }: { project: Project }) {
  const tiles = ["Velvet Serum — R680", "Field Balm — R420", "Pan Salt — R95", "Dusk Set — R1,150"];
  return (
    <div className="w-full h-full bg-ink text-left flex flex-col">
      <MockNav name={project.name} />
      <div className="flex-1 grid grid-cols-2 gap-px bg-line/60">
        <div className="relative overflow-hidden">
          <img src={project.cover} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-[5%] left-[6%] display text-[1.5vw] text-bone leading-tight drop-shadow-[0_2px_12px_rgba(11,10,8,0.9)]">
            Grown on the<br /><span className="italic text-amber">mountain.</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line/60">
          {tiles.map((t, i) => (
            <div key={t} className="bg-ink-2 p-[6%] flex flex-col justify-between">
              <span className="display text-[0.95vw] text-bone leading-snug">{t.split("—")[0]}</span>
              <span className="flex items-center justify-between">
                <span className="mono !text-[0.55vw] text-smoke">{t.split("—")[1]}</span>
                <span className={cn("mono !text-[0.55vw] px-[0.5vw] py-[0.25vw]", i < 2 ? "bg-amber text-ink" : "border border-line text-smoke")}>
                  {i < 2 ? "ADDED ✓" : "+ ADD"}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockMusic({ project }: { project: Project }) {
  return (
    <div className="w-full h-full bg-ink text-left flex flex-col">
      <div className="flex-1 grid grid-cols-3 gap-px bg-line/60 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn("relative flex flex-col justify-between p-[6%]", i === 1 ? "bg-ink-2" : "bg-ink")}>
            {i === 1 ? (
              <img src={project.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            ) : (
              <>
                <span className="display text-[2.2vw] leading-[0.9] text-bone tracking-tight" style={{ wordBreak: "break-word" }}>
                  {i === 0 ? <>SUN<br />SET<br />SIDE</> : <>NIGHT<br />SIDE<br /><span className="italic text-amber">B.</span></>}
                </span>
                <span className="mono !text-[0.55vw] text-smoke">LP — 180G — {i === 0 ? "HLP-012" : "HLP-014"}</span>
              </>
            )}
            {i === 1 && <span className="absolute bottom-[5%] left-[8%] mono !text-[0.55vw] bg-amber text-ink px-[2%] py-[1.5%]">NOW SPINNING</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-[2%] px-[3%] py-[2.5%] bg-ink-2 border-t border-line">
        <span className="w-[1.5vw] h-[1.5vw] rounded-full bg-amber grid place-items-center">
          <i className="block w-0 h-0 border-t-[0.3vw] border-b-[0.3vw] border-l-[0.5vw] border-transparent border-l-ink ml-[10%]" />
        </span>
        <div className="flex items-end gap-[0.25vw] h-[1.4vw]" aria-hidden="true">
          {[5,9,7,12,6,10,4,8,11,5,9,7,3,8,10,6,12,7,9,5].map((h, i) => (
            <i key={i} className="w-[0.18vw] bg-amber/80 rounded-t-sm" style={{ height: `${(h / 12) * 100}%` }} />
          ))}
        </div>
        <span className="mono !text-[0.55vw] text-smoke ml-auto">SIDE B — “KLOOF ST, 2AM” — 03:47</span>
      </div>
    </div>
  );
}

function MockHotel({ project }: { project: Project }) {
  return (
    <div className="w-full h-full text-left relative bg-ink">
      <img src={project.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
      <div className="absolute top-0 inset-x-0"><MockNav name="Kloof Corner" /></div>
      <div className="absolute bottom-[6%] left-[5%] right-[5%] flex items-end justify-between gap-[2%]">
        <div>
          <div className="mono !text-[0.55vw] text-amber mb-[2%]">TWELVE ROOMS — ONE HILLSIDE — ONE DOG</div>
          <div className="display text-[2.4vw] leading-[0.95] text-bone tracking-tight">
            Check in.<br /><span className="italic">Slow down.</span>
          </div>
        </div>
        <div className="bg-ink/85 backdrop-blur-sm border border-line p-[3%] w-[36%]">
          <div className="mono !text-[0.5vw] text-smoke flex justify-between mb-[6%]"><span>ROOM 04 — MOUNTAIN</span><span className="text-amber">R2,850/N</span></div>
          <div className="h-px bg-line mb-[6%]" />
          <div className="mono !text-[0.55vw] text-center bg-amber text-ink py-[4%] px-[2%]">BOOK DIRECT — SAVE 18%</div>
        </div>
      </div>
    </div>
  );
}
