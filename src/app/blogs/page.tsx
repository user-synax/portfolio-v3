import type { Metadata } from "next";
import Link from "next/link";
import { parse, format } from "date-fns";

import { Reveal, RevealLine } from "@/components/reveal";
import { pageAlternates } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";

const DESCRIPTION =
  "Notes on building in public, the self-taught path, and application security — written by Ayush, from Delhi.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: pageAlternates("https://synax.me/blogs"),
  openGraph: {
    title: "Blog — Ayush",
    description: DESCRIPTION,
    url: "https://synax.me/blogs",
    siteName: "synax.me",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog — Ayush",
    description: DESCRIPTION,
  },
};

/** ISO `YYYY-MM-DD` → `20 Sep 2026`, parsed explicitly so the timezone can't shift the day. */
function displayDate(iso: string): string {
  return format(parse(iso, "yyyy-MM-dd", new Date()), "d MMM yyyy");
}

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20">
      <Reveal className="flex flex-col gap-3">
        <RevealLine
          as="p"
          index={1}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent"
        >
          Writing
        </RevealLine>
        <RevealLine
          as="h1"
          index={2}
          className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight"
        >
          Blog
        </RevealLine>
        <RevealLine
          as="p"
          index={3}
          className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
        >
          {DESCRIPTION}
        </RevealLine>
      </Reveal>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border bg-surface p-6">
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
            Nothing published yet. Posts live as{" "}
            <code className="rounded-md border border-border bg-raised px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
              .mdx
            </code>{" "}
            files in{" "}
            <code className="rounded-md border border-border bg-raised px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
              content/blogs/
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-3">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-border bg-surface p-5 transition-all duration-150 hover:-translate-y-px hover:border-accent/35"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{displayDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
                {post.draft && (
                  <span className="text-accent">Draft</span>
                )}
              </div>

              <h2 className="font-display text-[1.0625rem] leading-[1.3] font-semibold transition-colors duration-150 group-hover:text-accent">
                {post.title}
              </h2>

              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              {post.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/60 bg-accent-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
