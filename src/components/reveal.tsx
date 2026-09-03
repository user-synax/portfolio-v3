"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

import { cn } from "@/lib/utils";

/**
 * Staggered entrance for stacked top-of-page content — drives the
 * `texts-reveal` CSS transition from the transitions-dev skill
 * (see .t-stagger in globals.css, tokens in design.md).
 *
 * Server-rendered lines start hidden; once the client mounts this flips
 * `.is-shown` after a frame so the blur-rise plays. Replays on every
 * route change because pages remount inside the page transition.
 * Reduced-motion users get an instant reveal (CSS guard in globals.css).
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const show = () => {
      if (!cancelled) setShown(true);
    };

    // Flip after the first paint so the CSS transition actually plays
    // (a same-frame flip would skip it). rAF first, timer fallback for
    // throttled/hidden tabs where rAF never fires.
    const raf = requestAnimationFrame(show);
    const fallback = window.setTimeout(show, 60);
    // 500ms duration + 5 × 40ms max stagger + margin, then force the
    // resting state so lines can never stay invisible (see the
    // .t-stagger-settled rule in globals.css).
    const settle = window.setTimeout(() => setSettled(true), 820);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      clearTimeout(settle);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "t-stagger",
        shown && "is-shown",
        settled && "t-stagger-settled",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * One staggered line. `index` is its position in the stack (1-based) —
 * the per-line delay class is derived from it. Keep stacks to ≤ 6 lines
 * so the last line doesn't feel late (stagger total under ~300ms).
 */
export function RevealLine({
  as,
  index = 1,
  className = "",
  children,
}: {
  as?: ElementType;
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as ?? "div";
  const delay = Math.min(Math.max(index, 1), 6);
  return (
    <Tag className={cn("t-stagger-line", `t-stagger-line--${delay}`, className)}>
      {children}
    </Tag>
  );
}