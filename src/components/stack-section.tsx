/**
 * "Stack" section for the home page — the tools Ayush claims in the hero
 * bio ("I build with Next.js, TypeScript and Tailwind day to day"), shown
 * as small bordered chips with logos from skillicons.dev.
 *
 * Icons are rendered desaturated; they colorize on hover (per design.md's
 * restrained-accent discipline and 150ms hover micro-transitions).
 */

const STACK = [
  { name: "Next.js", slug: "nextjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind", slug: "tailwind" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Bun", slug: "bun" },
  { name: "Express", slug: "express" },
  { name: "Azure", slug: "azure" },
  { name: "Docker", slug: "docker" },
  { name: "Figma", slug: "figma" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Vercel", slug: "vercel" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Go", slug: "go" },
] as const;

export function StackSection() {
  return (
    <section aria-label="Tech stack" className="mt-16">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          Stack
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <ul className="flex flex-wrap gap-2">
        {STACK.map(({ name, slug }) => (
          <li
            key={slug}
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface py-1.5 pr-3 pl-2 transition-all duration-150 hover:-translate-y-px hover:border-accent/35"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://skillicons.dev/icons?i=${slug}`}
              alt={`${name} logo`}
              width={20}
              height={20}
              loading="lazy"
              className="size-5 opacity-80 grayscale transition-all duration-150 group-hover:opacity-100 group-hover:grayscale-0"
            />
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase transition-colors duration-150 group-hover:text-foreground">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
