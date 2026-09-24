import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based blog content, read from `content/blogs/*.mdx`.
 *
 * Adding a post never touches `src/` — drop in a file with frontmatter and
 * it shows up on /blogs, in the sitemap and in the RSS feed.
 *
 * Frontmatter is parsed here with gray-matter — the bundled Next.js MDX
 * guide's recommended solution, and no part of our toolchain parses it for
 * us — so the list page only ever reads metadata and never compiles a post.
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, `YYYY-MM-DD` — sorts lexicographically. */
  date: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
};

/** Matches a URL-safe slug. Also the path-traversal guard for `[slug]`. */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * The slug a filename produces, or `null` if it isn't URL-safe.
 *
 * This check must gate **both** `readPosts()` and `getPost()`, and that's the
 * load-bearing invariant of the whole blog: every slug that reaches
 * `generateStaticParams` (and so the sitemap, feed and list) has to be one
 * `getPost()` can actually resolve. Letting a non-conforming filename into
 * the listing while `getPost()` rejects it would put a slug in the sitemap
 * that renders the not-found boundary at HTTP 200 — a soft-404, since
 * `notFound()` fires after `await params` inside the root `loading.tsx`
 * Suspense and can no longer change the status (see guides/streaming).
 */
function slugFor(file: string): string | null {
  if (!file.endsWith(".mdx")) return null;
  const slug = file.slice(0, -".mdx".length);
  return SLUG_RE.test(slug) ? slug : null;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blogs");

/** Drafts render locally but are excluded from production builds. */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

function readingTime(source: string): string {
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toPost(fileName: string, raw: string): Post {
  const { data, content } = matter(raw);

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: typeof data.title === "string" ? data.title : "Untitled",
    description:
      typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : "2026-01-01",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    readingTime: readingTime(content),
  };
}

function readPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const usable: string[] = [];
  const skipped: string[] = [];

  for (const file of fs.readdirSync(POSTS_DIR)) {
    const slug = slugFor(file);
    if (slug === null) {
      if (file.endsWith(".mdx")) skipped.push(file);
      continue;
    }
    usable.push(file);
  }

  // Loud rather than silent: a post that can't have a URL is a bug in the
  // content, not something to quietly drop.
  if (skipped.length > 0) {
    console.warn(
      `[content/blogs] skipped ${skipped.length} post(s) — filenames must be ` +
        `lowercase letters, digits and hyphens: ${skipped.join(", ")}`,
    );
  }

  return usable
    .map((file) =>
      toPost(file, fs.readFileSync(path.join(POSTS_DIR, file), "utf8")),
    )
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return readPosts();
}

/** One post's metadata plus its Markdown body (frontmatter stripped). */
export function getPost(
  slug: string,
): { post: Post; content: string } | null {
  // Reject anything that isn't a plain slug before it reaches the filesystem.
  // `slugFor` is the same gate `readPosts()` applies, so a slug that was ever
  // listed here is guaranteed to resolve.
  if (!SLUG_RE.test(slug)) return null;

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const post = toPost(`${slug}.mdx`, raw);

  if (post.draft && !SHOW_DRAFTS) return null;

  return { post, content };
}
