/**
 * "Stack" section for the home page — the tools Ayush claims in the hero
 * bio ("I build with Next.js, TypeScript and Tailwind day to day"), shown
 * as small bordered chips with logos from skillicons.dev.
 *
 * One typed config array drives every group and chip. Primary tools get a
 * slightly brighter neutral border + text; hover/focus lifts the chip 1px and
 * reveals its one-line note. Pure CSS, so this stays a server component with
 * zero client JS.
 */

import { cn } from "@/lib/utils";

type StackItem = {
  name: string;
  /** skillicons.dev slug. */
  icon: string;
  /** Day-to-day tools — slightly brighter border and text. */
  primary?: boolean;
  /** One-line note revealed on hover / focus. */
  note: string;
};

type StackGroup = {
  label: string;
  items: StackItem[];
};

const STACK_GROUPS: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js", icon: "nextjs", primary: true, note: "CampusZen, Codingo, this site" },
      { name: "React", icon: "react", note: "UI on every Next.js project" },
      { name: "TypeScript", icon: "typescript", primary: true, note: "All app code, end to end" },
      { name: "Tailwind", icon: "tailwind", primary: true, note: "Styling on every project" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs", primary: true, note: "APIs and build tooling" },
      { name: "Express", icon: "express", note: "REST APIs on full-stack apps" },
      { name: "Bun", icon: "bun", note: "Codingo's runtime and tooling" },
      { name: "Go", icon: "go", note: "Backend services and CLIs" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB", icon: "mongodb", note: "Codingo's document store" },
      { name: "PostgreSQL", icon: "postgresql", primary: true, note: "Primary relational data store" },
    ],
  },
  {
    label: "Infra",
    items: [
      { name: "Docker", icon: "docker", note: "Containerized local services" },
      { name: "Vercel", icon: "vercel", note: "Web app deploys and previews" },
      { name: "Azure", icon: "azure", note: "Cloud services and hosting" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: "git", note: "Every project, every day" },
      { name: "GitHub", icon: "github", note: "Source, CI and profile stats" },
      { name: "Linux", icon: "linux", note: "My everyday dev environment" },
      { name: "Figma", icon: "figma", note: "Layouts before I write JSX" },
    ],
  },
];

export function StackSection() {
  return (
    <section aria-label="Tech stack" className="mt-16">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          Stack
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-4">
        {STACK_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map(({ name, icon, primary, note }) => {
                const noteId = `stack-note-${icon}`;
                return (
                  <li key={icon} className="group relative flex h-8 items-center">
                    <button
                      type="button"
                      aria-describedby={noteId}
                      className={cn(
                        "inline-flex h-8 items-center gap-2 rounded-md border bg-surface pr-3 pl-2",
                        "text-zinc-300 transition-all duration-150 ease-out",
                        "hover:-translate-y-px hover:border-accent/35 hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                        primary ? "border-white/20 text-foreground" : "border-border",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://skillicons.dev/icons?i=${icon}`}
                        alt={`${name} logo`}
                        width={16}
                        height={16}
                        loading="lazy"
                        className="size-4 shrink-0"
                      />
                      <span className="font-mono text-[0.75rem] tracking-[0.14em] uppercase">
                        {name}
                      </span>
                    </button>
                    <span
                      id={noteId}
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[min(14rem,80vw)] -translate-x-1/2 rounded-md border border-border bg-raised px-2 py-1 text-left font-mono text-[0.6875rem] leading-snug text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                    >
                      {note}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
