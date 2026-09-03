import { GitCommitHorizontal } from "lucide-react";

import { WidgetCard } from "@/components/widget-card";
import { timeAgo } from "@/lib/time";

type GitHubEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: { head?: string };
};

type CommitInfo = { repo: string; message: string | null; at: string };

const API_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "synax.me",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function getLatestCommit(): Promise<CommitInfo | null> {
  try {
    // GitHub's events API no longer includes commit details in payloads,
    // so we resolve the head SHA against the commits endpoint afterwards.
    // Both calls are cached server-side (5 min revalidate) — never per-request.
    const eventsRes = await fetch(
      "https://api.github.com/users/user-synax/events/public",
      { headers: API_HEADERS, next: { revalidate: 300 } },
    );
    if (!eventsRes.ok) return null;

    const events: GitHubEvent[] = await eventsRes.json();
    const push = events.find((event) => event.type === "PushEvent");
    if (!push) return null;

    const repo = push.repo.name;
    const sha = push.payload?.head;
    let message: string | null = null;

    if (sha) {
      const commitRes = await fetch(
        `https://api.github.com/repos/${repo}/commits/${sha}`,
        { headers: API_HEADERS, next: { revalidate: 300 } },
      );
      if (commitRes.ok) {
        const commit: { commit?: { message?: string } } = await commitRes.json();
        message = commit.commit?.message?.split("\n")[0] ?? null;
      }
    }

    return {
      repo: repo.replace(/^user-synax\//, ""),
      message,
      at: push.created_at,
    };
  } catch {
    return null;
  }
}

export async function GithubWidget() {
  const commit = await getLatestCommit();

  return (
    <WidgetCard label="GitHub">
      {commit ? (
        <>
          <p className="flex items-center gap-1.5 font-mono text-sm text-foreground">
            <GitCommitHorizontal className="size-3.5 shrink-0 text-accent" />
            <span className="truncate">{commit.repo}</span>
          </p>
          {commit.message ? (
            <p className="mt-auto text-[0.8125rem] leading-snug text-muted-foreground">
              {commit.message}
            </p>
          ) : (
            <p className="mt-auto text-[0.8125rem] text-muted-foreground">
              Recently pushed
            </p>
          )}
          <p className="font-mono text-[0.6875rem] text-faint">
            last commit · {timeAgo(commit.at)}
          </p>
        </>
      ) : (
        <p className="mt-auto text-[0.8125rem] text-muted-foreground">
          No recent public activity.
        </p>
      )}
    </WidgetCard>
  );
}