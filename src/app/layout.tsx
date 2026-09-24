import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
    display: "swap",
});

const SITE_URL = "https://synax.me";
const DEFAULT_TITLE = "Ayush — Full-stack developer in Delhi";
const DEFAULT_DESCRIPTION =
    "Self-taught full-stack developer based in Delhi, India. Building for the full-stack + application security space — CampusZen, Kivo";

export const metadata: Metadata = {
    openGraph: {
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        images: ["/og-image.png"],
    },
    title: {
        default: DEFAULT_TITLE,
        template: "%s — Ayush",
    },
    description: DEFAULT_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
    }
};

/**
 * Person structured data — built only from values already present in the
 * codebase (name/role/location from layout + hero, profile URLs from
 * src/lib/socials.ts). No email, employer, or education fields: none of
 * those are declared as structured facts in the code.
 */
const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush",
    jobTitle: "Full-stack developer",
    url: SITE_URL,
    homeLocation: {
        "@type": "Place",
        name: "Delhi, India",
    },
    sameAs: [
        "https://github.com/user-synax",
        "https://linkedin.com/in/user-synax",
        "https://x.com/user_synax",
    ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`dark ${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} h-full antialiased`}
        >
            <body className="flex min-h-dvh flex-col">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personJsonLd),
                    }}
                />
                {/* Persistent shell — stays mounted across route changes, only the
            main content area transitions (see page-transition.tsx). */}
                <SiteHeader />
                <PageTransition>{children}</PageTransition>
                <SiteFooter />
            </body>
        </html>
    );
}
