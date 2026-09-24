import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * 404 — root `not-found.tsx` catches every unmatched URL in the app (and
 * anything throwing `notFound()`), rendered inside the root layout so the
 * header/footer stay put.
 *
 * Deliberately no `Reveal` here: design.md scopes the text-reveal entrance
 * to the hero and the /projects + /contact title stacks, and a 404 should
 * paint immediately rather than stagger in.
 */
export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
        The link may be old, or the URL was typed by hand. Nothing to see
        here — but the projects are one click away.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button size="lg" render={<Link href="/" />}>
          <ArrowLeft />
          Back home
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/projects" />}>
          <FolderGit2 />
          See projects
        </Button>
      </div>
    </div>
  );
}
