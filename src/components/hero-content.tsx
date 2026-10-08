import { Reveal, RevealLine } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROJECT_LINKS = {
  CampusZen: "https://campuszen.tech",
  Kivo: "https://kivo.usersynax.dev",
  Codingo: "https://coding.synax.me",
} as const;

function ProjectLink({ name }: { name: keyof typeof PROJECT_LINKS }) {
  return (
    <a
      href={PROJECT_LINKS[name]}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} — open live site`}
      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
    >
      {name}
    </a>
  );
}

export function HeroContent() {
  return (
    <Reveal className="flex flex-col gap-4">
      <RevealLine index={1}>
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-zinc-300">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-emerald-400"
          />
          Open to internships and fresher roles
        </p>
      </RevealLine>
      <RevealLine
        as="p"
        index={2}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent"
      >
        Delhi, India — building in public
      </RevealLine>
      <RevealLine
        as="h1"
        index={3}
        className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-medium leading-[1.02] tracking-tight"
      >
        Ayush
      </RevealLine>
      <RevealLine
        as="p"
        index={4}
        className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-zinc-300"
      >
        Full-stack developer building and securing web apps.
      </RevealLine>
      <RevealLine
        as="p"
        index={5}
        className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-zinc-300"
      >
        I build with Next.js, TypeScript and Tailwind day to day — currently{" "}
        <ProjectLink name="CampusZen" />, <ProjectLink name="Kivo" /> and{" "}
        <ProjectLink name="Codingo" />.
      </RevealLine>
      <RevealLine index={6}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="#projects"
              aria-label="View projects — scroll to projects section"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              View projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Open resume PDF in a new tab"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Resume
            </a>
          </div>
          <SocialLinks />
        </div>
      </RevealLine>
    </Reveal>
  );
}