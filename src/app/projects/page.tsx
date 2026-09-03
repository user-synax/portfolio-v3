import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Reveal, RevealLine } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things Ayush builds: CampusZen, Kivo, Mahamaya, CPGRAM Recreate and Blob.io.",
};

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.site && (
        <a
          href={project.site}
          target="_blank"
          rel="noreferrer"
          className="underline-slide inline-flex items-center gap-1 text-sm text-accent"
        >
          Visit site
          <ArrowUpRight className="size-3.5" />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="underline-slide inline-flex items-center gap-1 text-sm text-accent"
        >
          GitHub
          <ArrowUpRight className="size-3.5" />
        </a>
      )}
      {project.repoPlaceholder && !project.repo && (
        <span className="text-[0.8125rem] text-faint">
          Repo private — coming soon
        </span>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20">
      <Reveal className="flex flex-col gap-3">
        <RevealLine
          as="p"
          index={1}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent"
        >
          Work & side projects
        </RevealLine>
        <RevealLine
          as="h1"
          index={2}
          className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight"
        >
          Projects
        </RevealLine>
        <RevealLine
          as="p"
          index={3}
          className="max-w-[55ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
        >
          What I&apos;m shipping — no invented metrics, just the stack and
          the story behind each one.
        </RevealLine>
      </Reveal>

      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-surface">
        {projects.map((project, i) => (
          <article
            key={project.name}
            className={`flex flex-col gap-2 p-6 transition-colors duration-150 hover:bg-raised/60 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-[1.0625rem] font-semibold tracking-tight">
                {project.name}
              </h2>
              <span className="font-mono text-[0.6875rem] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[0.8125rem] text-muted-foreground">
              {project.tagline}
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-foreground/80">
              {project.description}
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-border/60 font-mono text-[0.6875rem] font-medium normal-case tracking-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <ProjectLinks project={project} />
          </article>
        ))}
      </div>
    </div>
  );
}