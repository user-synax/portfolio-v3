"use client";

import { ArrowUpRight } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/r-hover-card";
import { projects, type Project } from "@/lib/projects";

/**
 * Featured-project preview tiles for the home spotlight, powered by
 * Ayush's r-hover-card: hovering (or focusing) a tile opens a floating
 * image preview panel with the project description and links.
 *
 * Covers live under /public/projects/*.png — branded placeholders, swap
 * for real screenshots when you have them (update `covers` below).
 */

const covers: Record<string, string> = {
  CampusZen: "/projects/campuszen.png",
  Kivo: "/projects/kivo.png",
};

const status: Record<string, string> = {
  CampusZen: "Soft launch",
  Kivo: "Beta",
};

const featured = projects.filter((p) => p.name === "CampusZen" || p.name === "Kivo");

export function SpotlightSection() {
  return (
    <section aria-label="Now building" className="mt-16">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          Now building
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {featured.map((project) => (
          <SpotlightCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

function SpotlightCard({ project }: { project: Project }) {
  const cover = covers[project.name];
  const primary = project.site ?? project.repo;
  const tag = status[project.name];

  return (
    <HoverCard openDelay={120} closeDelay={120}>
      <HoverCardTrigger
        asChild
        className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-150 hover:-translate-y-px hover:border-accent/35 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none"
      >
        <a
          href={primary}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} — open ${project.site ? "site" : "repo"}`}
        >
          {cover && (
            <span className="relative block overflow-hidden border-b border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover}
                alt={`${project.name} preview`}
                width={800}
                height={450}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-150 group-hover:scale-[1.03]"
              />
              <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-md border border-border bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors duration-150 group-hover:text-accent">
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only">Open</span>
              </span>
            </span>
          )}
          <span className="flex flex-col gap-1.5 p-4">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
              {tag ?? project.tags[0]}
            </span>
            <h3 className="font-display text-[1.0625rem] font-semibold tracking-tight">
              {project.name}
            </h3>
            <span className="text-[0.8125rem] leading-relaxed text-muted-foreground">
              {project.tagline}
            </span>
          </span>
        </a>
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="center"
        sideOffset={14}
        className="w-[21rem] overflow-hidden p-0"
      >
        {cover && (
          <span className="block overflow-hidden border-b border-[color:var(--hc-border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={`${project.name} preview`}
              width={800}
              height={450}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </span>
        )}
        <span className="flex flex-col gap-2 p-4">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
            {tag ?? project.tags[0]}
          </span>
          <span className="font-display text-[1.0625rem] font-semibold tracking-tight">
            {project.name}
          </span>
          <span className="text-[0.8125rem] leading-relaxed opacity-80">
            {project.description}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {project.site && (
              <a
                href={project.site}
                target="_blank"
                rel="noreferrer"
                className="underline-slide inline-flex items-center gap-1 text-[0.8125rem] text-[color:var(--hc-foreground)] hover:text-accent"
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
                className="underline-slide inline-flex items-center gap-1 text-[0.8125rem] text-[color:var(--hc-foreground)] hover:text-accent"
              >
                GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </span>
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}