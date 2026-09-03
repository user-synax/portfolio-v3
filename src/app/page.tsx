import type { Metadata } from "next";

import { AvailableCard } from "@/components/available-card";
import { GithubStatsSection } from "@/components/github-stats";
import { HeroContent } from "@/components/hero-content";
import { SpotlightSection } from "@/components/spotlight-card";
import { StackSection } from "@/components/stack-section";
import { DiscordWidget } from "@/components/widgets/discord-widget";
import { GithubWidget } from "@/components/widgets/github-widget";
import { WeatherWidget } from "@/components/widgets/weather-widget";

export const metadata: Metadata = {
  title: {
    absolute: "Ayush — Full-stack developer in Delhi",
  },
  description:
    "Self-taught full-stack developer in Delhi building CampusZen and Kivo with Next.js, TypeScript and Tailwind.",
  alternates: {
    canonical: "https://synax.me/",
  },
  openGraph: {
    title: "Ayush — Full-stack developer in Delhi",
    description:
      "Self-taught full-stack developer in Delhi building CampusZen and Kivo with Next.js, TypeScript and Tailwind.",
    url: "https://synax.me/",
    siteName: "synax.me",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ayush — Full-stack developer in Delhi",
    description:
      "Self-taught full-stack developer in Delhi building CampusZen and Kivo with Next.js, TypeScript and Tailwind.",
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-24">
      <HeroContent />

      <StackSection />

      <SpotlightSection />

      <GithubStatsSection />

      <AvailableCard />

      <section aria-label="Live updates" className="mt-16">
        <div className="mb-3 flex items-center gap-3">
          <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
            Live
          </h2>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <GithubWidget />
          <WeatherWidget />
          <DiscordWidget />
        </div>
      </section>
    </div>
  );
}