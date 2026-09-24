import type { Metadata } from "next";

/**
 * `alternates` for a route: its canonical URL plus RSS autodiscovery.
 *
 * Every route must build its `alternates` through here. The bundled docs
 * (generate-metadata.md → Merging) are explicit that metadata from layout
 * and page is **shallowly merged**, with duplicate keys *replaced* — so a
 * page that sets `alternates` for its canonical discards the root layout's
 * `alternates` wholesale, taking the feed's `<link rel="alternate">` with it.
 *
 * One builder means all routes emit `types`, and adding a page can't
 * silently drop the feed from its `<head>`.
 *
 * `canonical` is passed through untouched: pages already carry absolute
 * URLs, and rewriting them here would change canonical output for no gain
 * (they resolve identically against `metadataBase`).
 */
export function pageAlternates(
  canonical: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical,
    types: {
      "application/rss+xml": "/rss.xml",
    },
  };
}
