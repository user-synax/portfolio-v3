import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { parse, format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import { Reveal, RevealLine } from "@/components/reveal";
import { pageAlternates } from "@/lib/metadata";
import { getAllPosts, getPost } from "@/lib/posts";
import { mdxComponents } from "./mdx";

type Params = { params: Promise<{ slug: string }> };

/** Posts are known at build time, so every slug is pre-rendered. */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Anything not enumerated by `generateStaticParams` is not a post — reject it
 * with a real 404 instead of letting the page run.
 *
 * Left at the default (`true`), an unknown slug reaches this page, where
 * `notFound()` fires *after* `await params` and inside the root `loading.tsx`
 * Suspense boundary. Streaming has already begun, the server is committed to
 * `200 OK`, and Next can only inject `noindex` — a soft-404 that the sitemap
 * would happily list. Rejecting here happens before any of that, so Next
 * serves the 404 itself (same path as an unmatched URL).
 *
 * See: guides/streaming → "notFound() fires mid-stream", and the MDX guide's
 * `dynamicParams` note. Requires `cacheComponents` to stay off (it rejects
 * this export) — `next.config.ts` is currently bare.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = getPost(slug);
  if (!found) return {};

  const { post } = found;
  const url = `https://synax.me/blogs/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: pageAlternates(url),
    openGraph: {
      title: `${post.title} — Ayush`,
      description: post.description,
      url,
      siteName: "synax.me",
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: `${post.title} — Ayush`,
      description: post.description,
    },
  };
}

function displayDate(iso: string): string {
  return format(parse(iso, "yyyy-MM-dd", new Date()), "d MMM yyyy");
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const found = getPost(slug);
  if (!found) notFound();

  const { post, content } = found;

  // Compiled at build time in Node, so remark/rehype plugins can be passed
  // as real functions here — that's what sidesteps Turbopack's restriction
  // on function-valued plugins in next.config.
  const { content: body } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { theme: "vitesse-dark", keepBackground: false }],
        ],
      },
    },
    components: mdxComponents,
  });

  return (
    <article className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20">
      <Reveal className="flex flex-col gap-3">
        <RevealLine
          as="p"
          index={1}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent"
        >
          <time dateTime={post.date}>{displayDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="text-faint">{post.readingTime}</span>
          {post.draft && <span className="text-faint">· Draft</span>}
        </RevealLine>
        <RevealLine
          as="h1"
          index={2}
          className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight"
        >
          {post.title}
        </RevealLine>
        <RevealLine
          as="p"
          index={3}
          className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
        >
          {post.description}
        </RevealLine>
        {post.tags.length > 0 && (
          <RevealLine index={4} className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/60 bg-accent-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </RevealLine>
        )}
      </Reveal>

      <div className="mdx-prose mt-8">{body}</div>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          href="/blogs"
          className="underline-slide inline-flex items-center gap-1.5 text-sm text-accent"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>
      </div>
    </article>
  );
}
