import { useRef, useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { useClock, usePageTitle, useReveal } from "../lib/hooks";
import { Asterisk, Reveal, SectionHead } from "../components/ui";
import { cn } from "../utils/cn";

const budgets = ["R60–100k", "R100–250k", "R250k+", "Not sure yet"];

type Fields = { name: string; email: string; company: string; budget: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = { name: "", email: "", company: "", budget: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "We need a name — even a fake one.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "That email looks off. One more try?";
  if (!f.budget) e.budget = "Pick one — “Not sure yet” is a perfectly good answer.";
  if (f.message.trim().length < 20)
    e.message = `Give us a little more — ${Math.max(0, 20 - f.message.trim().length)} characters to go.`;
  return e;
}

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePageTitle("Open the Door — Contact Sundowner");
  const time = useClock();
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields, v: string) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p role="alert" className="mono text-amber mt-2 normal-case tracking-normal text-[0.72rem]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <main ref={root} id="main" className="pt-28 md:pt-40">
      <header className="px-5 md:px-10 pb-12 md:pb-20">
        <p className="mono text-smoke mb-6 flex items-center gap-3" data-fade>
          <Asterisk className="w-3 h-3 text-amber" spin />
          INDEX <span className="text-amber">/</span> CONTACT <span className="text-amber">/</span> REPLIES WITHIN ONE WORKING DAY
        </p>
        <Reveal as="h1" className="display font-light leading-[0.88] tracking-[-0.035em] text-[clamp(3rem,11.5vw,12rem)]">
          <span>OPEN THE</span>
          <span className="italic text-amber">DOOR.</span>
        </Reveal>
        <p className="text-bone-dim leading-relaxed max-w-lg mt-8" data-fade>
          Tell us what you're dreaming up — a launch, a rebuild, a suspicion
          your current site is quietly costing you money. We read every note
          ourselves, and we reply within one working day. Usually by lunch.
        </p>
      </header>

      <div className="px-5 md:px-10 pb-20 md:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-10">
        {/* details */}
        <aside className="lg:col-span-5 space-y-10">
          <div data-fade>
            <p className="mono text-smoke mb-3">NEW BUSINESS</p>
            <a
              href="mailto:hello@sundowner.studio"
              data-cursor="link"
              className="display text-[clamp(1.5rem,3vw,2.4rem)] leading-tight tracking-tight hover:text-amber transition-colors break-all"
            >
              hello@sundowner.studio
              <ArrowUpRight className="inline-block w-6 h-6 ml-1 text-amber" aria-hidden="true" />
            </a>
          </div>
          <ul className="space-y-5 text-bone-dim" data-fade>
            <li className="flex gap-4 items-start">
              <Phone className="w-4 h-4 text-amber mt-1 shrink-0" aria-hidden="true" />
              <span>
                <span className="mono text-smoke block mb-1">PREFER A HUMAN?</span>
                +27 (0)21 447 0219 — ask for Mia
              </span>
            </li>
            <li className="flex gap-4 items-start">
              <MapPin className="w-4 h-4 text-amber mt-1 shrink-0" aria-hidden="true" />
              <span>
                <span className="mono text-smoke block mb-1">THE STUDIO</span>
                47 Albert Rd, Woodstock, Cape Town 7915
                <br />
                <span className="text-smoke text-sm">Coffee's on us. Parking's on you.</span>
              </span>
            </li>
            <li className="flex gap-4 items-start">
              <Mail className="w-4 h-4 text-amber mt-1 shrink-0" aria-hidden="true" />
              <span>
                <span className="mono text-smoke block mb-1">RIGHT NOW IN CAPE TOWN</span>
                <span className="mono text-bone" suppressHydrationWarning>{time} SAST</span>
              </span>
            </li>
          </ul>
          <div className="border border-line p-6 bg-ink-2/50" data-fade>
            <p className="mono text-amber mb-3">CURRENTLY BOOKING</p>
            <p className="text-sm text-bone-dim leading-relaxed">
              Two project slots from <span className="text-bone">March 2026</span>.
              Brand + web bundles get priority — and a small discount, because
              one team carrying a vision is simply better.
            </p>
          </div>
        </aside>

        {/* form */}
        <div className="lg:col-span-7" data-fade>
          <div className="border border-line bg-ink-2/50 p-6 md:p-10 relative overflow-hidden">
            <SectionHead index="SEC.01" label="THE FORM" right="30 SECONDS, PROMISE" className="mb-8" />

            {sent ? (
              <div aria-live="polite" className="py-10 md:py-16 text-center">
                <Check className="w-10 h-10 text-amber mx-auto mb-8" aria-hidden="true" />
                <p className="display font-light text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tight">
                  Door's open{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}.
                </p>
                <p className="text-bone-dim leading-relaxed max-w-md mx-auto mt-6">
                  Your note is in the studio inbox — a real human reads it next,
                  not a robot. Expect a reply within one working day. The
                  kettle is already on.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFields(initial);
                    setErrors({});
                  }}
                  data-cursor="link"
                  className="mono mt-10 border border-line px-6 py-3 text-bone hover:border-amber hover:text-amber transition-colors"
                >
                  SEND ANOTHER NOTE
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <label htmlFor="f-name" className="mono text-smoke block mb-1.5">
                    YOUR NAME <span className="text-amber">*</span>
                  </label>
                  <input
                    id="f-name"
                    className={cn("field", errors.name && "field-error")}
                    placeholder="MIA VOGEL"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    autoComplete="name"
                  />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="f-email" className="mono text-smoke block mb-1.5">
                    EMAIL <span className="text-amber">*</span>
                  </label>
                  <input
                    id="f-email"
                    type="email"
                    className={cn("field", errors.email && "field-error")}
                    placeholder="YOU@COMPANY.COM"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                  {err("email")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-company" className="mono text-smoke block mb-1.5">
                    COMPANY / PROJECT <span className="text-smoke/60">(OPTIONAL)</span>
                  </label>
                  <input
                    id="f-company"
                    className="field"
                    placeholder="THE NEXT BIG THING (PTY) LTD"
                    value={fields.company}
                    onChange={(e) => set("company", e.target.value)}
                    autoComplete="organization"
                  />
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="mono text-smoke mb-3">
                    BUDGET BALLPARK <span className="text-amber">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        data-cursor="link"
                        onClick={() => set("budget", b)}
                        aria-pressed={fields.budget === b}
                        className={cn(
                          "mono px-4 py-2.5 border transition-colors duration-300",
                          fields.budget === b
                            ? "border-amber bg-amber text-ink"
                            : "border-line text-bone-dim hover:border-bone-dim hover:text-bone"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {err("budget")}
                </fieldset>
                <div className="sm:col-span-2">
                  <label htmlFor="f-msg" className="mono text-smoke block mb-1.5">
                    WHAT ARE WE MAKING? <span className="text-amber">*</span>
                  </label>
                  <textarea
                    id="f-msg"
                    rows={4}
                    className={cn("field resize-none", errors.message && "field-error")}
                    placeholder="TELL US THE DREAM. DEADLINES, DARLINGS, BUDGET SCARS FROM PAST AGENCIES — ALL WELCOME."
                    value={fields.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                  {err("message")}
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <p className="mono text-smoke leading-relaxed">
                    NO NEWSLETTERS. NO “JUST BUMPING THIS”.
                    <br />
                    AVG REPLY TIME: 6H 12M.
                  </p>
                  <button
                    type="submit"
                    data-cursor="link"
                    className="group mono inline-flex items-center gap-3 bg-amber text-ink px-7 py-4 hover:bg-bone transition-colors duration-300"
                  >
                    SEND IT THROUGH THE DOOR
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
