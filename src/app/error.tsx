"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary (must be a client component). Catches anything
 * thrown while rendering the segment and offers a retry that re-fetches and
 * re-renders — per the Next 16 docs, `retry` is the stable prop (v16.3+).
 *
 * Renders inside the root layout, so header/footer persist and the failure
 * reads as part of the site rather than a browser default page.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // Surface in the console for now; wire to an error reporter if one lands.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
        Something broke
      </p>
      <h1 className="mt-3 font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight">
        That didn&apos;t work
      </h1>
      <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
        An unexpected error hit this page. Trying again usually clears it —
        if it keeps happening, the contact page still works.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button size="lg" onClick={() => retry()}>
          <RotateCcw />
          Try again
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/" />}>
          <ArrowLeft />
          Back home
        </Button>
      </div>

      {error.digest && (
        <p className="mt-6 font-mono text-[0.6875rem] text-faint">
          error ref: {error.digest}
        </p>
      )}
    </div>
  );
}
