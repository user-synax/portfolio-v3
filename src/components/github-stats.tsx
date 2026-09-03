"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/contribution-graph";

/**
 * "GitHub stats" section for the home page — the contribution calendar
 * widget Ayush added (src/components/ui/contribution-graph.tsx), rendered
 * under the "Now building" spotlight.
 *
 * The graph fetches the last-year contribution history client-side from
 * the github-contributions-api mirror when the widget mounts, shows a
 * shimmer placeholder meanwhile, and degrades to a small error note if
 * the fetch fails.
 *
 * NOTE: this file must stay a client component — ContributionGraphCalendar
 * takes a render-function child, which can't cross the server boundary.
 */

const GITHUB_USERNAME = "user-synax";

export function GithubStatsSection() {
  return (
    <section aria-label="GitHub contribution activity" className="mt-16">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          GitHub stats
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <div className="rounded-lg border border-border bg-surface p-4">
        <ContributionGraph username={GITHUB_USERNAME}>
          <ContributionGraphCalendar>
            {({ activity, weekIndex, dayIndex }) => (
              <ContributionGraphBlock
                activity={activity}
                weekIndex={weekIndex}
                dayIndex={dayIndex}
              />
            )}
          </ContributionGraphCalendar>
          <ContributionGraphFooter className="mt-2 px-1">
            <ContributionGraphTotalCount />
            <ContributionGraphLegend />
          </ContributionGraphFooter>
        </ContributionGraph>
      </div>
    </section>
  );
}
