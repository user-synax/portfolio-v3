/**
 * "Stack" section for the home page — the tools Ayush claims in the hero
 * bio ("I build with Next.js, TypeScript and Tailwind day to day"), shown
 * as small bordered chips with logos from skillicons.dev.
 *
 * Grouped into Frontend / Backend / Infra / Tools. Icons render at full color —
 * no dimming — with a 150ms hover lift (per design.md's restrained-accent
 * discipline).
 */

const STACK_GROUPS = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js", slug: "nextjs" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind", slug: "tailwind" },
      { name: "Figma", slug: "figma" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", slug: "nodejs" },
      { name: "Express", slug: "express" },
      { name: "Bun", slug: "bun" },
      { name: "Go", slug: "go" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    label: "Infra",
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Vercel", slug: "vercel" },
      { name: "Azure", slug: "azure" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Linux", slug: "linux" },
    ],
  },
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
      <div className="flex flex-col gap-4">
        {STACK_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map(({ name, slug }) => (
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
                    className="size-5"
                  />
                  <span className="font-mono text-[0.75rem] tracking-[0.14em] text-zinc-300 uppercase transition-colors duration-150 group-hover:text-foreground">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
