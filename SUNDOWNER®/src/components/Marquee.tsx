import type { ReactNode } from "react";
import { Asterisk } from "./ui";
import { cn } from "../utils/cn";

export function Marquee({
  items,
  className,
  duration = 30,
  big = false,
}: {
  items: ReactNode[];
  className?: string;
  duration?: number;
  big?: boolean;
}) {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "whitespace-nowrap",
              big
                ? "display text-[clamp(2.2rem,6vw,5.5rem)] leading-none px-6 md:px-10"
                : "mono text-smoke px-5 md:px-7"
            )}
          >
            {it}
          </span>
          <Asterisk
            className={cn(
              "text-amber",
              big ? "w-7 h-7 md:w-10 md:h-10" : "w-3 h-3"
            )}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee py-5 md:py-7 border-y border-line", className)}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
