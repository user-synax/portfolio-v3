import { Reveal, RevealLine } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";

export function HeroContent() {
  return (
    <Reveal className="flex flex-col gap-4">
      <RevealLine
        as="p"
        index={1}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent"
      >
        Delhi, India — building in public
      </RevealLine>
      <RevealLine
        as="h1"
        index={2}
        className="font-display text-[clamp(2.5rem,8vw,3.25rem)] font-medium leading-[1.02] tracking-tight"
      >
        Ayush
      </RevealLine>
      <RevealLine
        as="p"
        index={3}
        className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
      >
        Self-taught full-stack developer in{" "}
        <span className="font-display italic text-foreground">Delhi</span>,
        building for the full-stack +{" "}
        <span className="font-display italic text-foreground">
          application security
        </span>{" "}
        space.
      </RevealLine>
      <RevealLine
        as="p"
        index={4}
        className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
      >
        I build with Next.js, TypeScript and Tailwind day to day. Right now
        I&apos;m working on{" "}
        <span className="text-foreground">CampusZen</span> — a verified
        student social network — and{" "}
        <span className="text-foreground">Kivo</span>, a realtime chat
        platform, and{" "}
        <span className="text-foreground">Codingo</span>, a free Duolingo-style
        app for learning programming. All while studying (NIOS 12th, planning
        IGNOU BCA from 2027) and building in public.
      </RevealLine>
      <RevealLine index={5}>
        <SocialLinks />
      </RevealLine>
    </Reveal>
  );
}