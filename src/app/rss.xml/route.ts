import { getAllPosts } from "@/lib/posts";

/**
 * RSS 2.0 feed at /rss.xml, built from the same files as /blogs.
 *
 * `force-static` generates it at build time (route handlers are dynamic by
 * default — see the Route Handlers guide), so it costs nothing per request.
 */
export const dynamic = "force-static";

const SITE_URL = "https://synax.me";
const FEED_URL = `${SITE_URL}/rss.xml`;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822, as RSS expects. Dates are ISO `YYYY-MM-DD` (UTC midnight). */
function toRfc822(iso: string): string {
  return new Date(`${iso}T00:00:00.000Z`).toUTCString();
}

export function GET(): Response {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blogs/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${toRfc822(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        post.tags
          .map((tag) => `      <category>${escapeXml(tag)}</category>`)
          .join("\n"),
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ayush — Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Notes on building in public, the self-taught path, and application security.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
