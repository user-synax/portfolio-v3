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

export const metadata: Metadata = {
  title: {
    default: "Ayush — Full-stack developer in Delhi",
    template: "%s — Ayush",
  },
  description:
    "Self-taught full-stack developer based in Delhi, India. Building for the full-stack + application security space — CampusZen, Kivo",
  metadataBase: new URL("https://synax.me"),
  openGraph: {
    title: "Ayush — Full-stack developer in Delhi",
    description:
      "Self-taught full-stack developer building for the full-stack + application security space.",
    url: "https://synax.me",
    siteName: "synax.me",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        {/* Persistent shell — stays mounted across route changes, only the
            main content area transitions (see page-transition.tsx). */}
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}