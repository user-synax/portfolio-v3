import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Element overrides handed to `compileMDX` for blog bodies.
 *
 * Only `a` is mapped here: external links open in a new tab, internal ones
 * client-navigate. Everything else (headings, lists, code) is styled by the
 * `.mdx-prose` rules in globals.css — CSS can tell inline <code> from a
 * fenced block via `:not(pre) > code`, which a component override can't.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    const internal = href.startsWith("/") && !external;

    const className = "underline-slide";

    if (internal) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};
