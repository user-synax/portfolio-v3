import { Reveal, RevealLine } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import TechText from "@/components/TechText";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

const PROJECT_LINKS = {
  CampusZen: "https://campuszen.tech",
  Kivo: "https://kivo.usersynax.dev",
  Codingo: "https://coding.synax.me",
} as const;

function ProjectLink({ name }: { name: keyof typeof PROJECT_LINKS }) {
  return (
    <a
      href={PROJECT_LINKS[name]}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} — open live site`}
      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
    >
      {name}
    </a>
  );
}

export function HeroContent() {
  return (
    <div>
      {/* Banner + overlapping avatar. Plain <img> so any URL in profile.ts works
          without next/image remote config. */}
      <div className="relative">
        <div
          className="h-32 overflow-hidden rounded-lg border border-border sm:h-40"
          style={
            profile.bannerUrl
              ? undefined
              : {
                  background:
                    "linear-gradient(135deg, var(--raised), var(--surface) 55%, var(--accent-soft))",
                }
          }
        >
          {profile.bannerUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.bannerUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>
        <div className="relative -mt-10 ml-4 size-24 overflow-hidden rounded-full border border-border bg-raised ring-4 ring-background sm:-mt-12 sm:ml-5 sm:size-28">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt="Ayush"
              className="size-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-full items-center justify-center font-display text-4xl text-muted"
            >
              A
            </span>
          )}
        </div>
      </div>

      <Reveal className="mt-2 flex flex-col gap-4">
        <RevealLine
          as="div"
          index={3}
          className="flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <h1 className="font-display h-20 w-40 font-medium sm:h-28 sm:w-56">
            {/* align-left + -5% cancels TechText's built-in 5% inset so the
                word lines up with the bio below on every screen size. */}
            <TechText
              text="Ayush"
              align="center"
              accentColor="#ff5a36"
              fontWeight={500}
              intro="assemble"
              style={{ marginLeft: "-5%" }}
              sweep={true}
            />
          </h1>
          <span className="font-mono text-[0.8125rem] text-faint">
            @user-synax
          </span>
        </RevealLine>
        <RevealLine
          as="p"
          index={4}
          className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-zinc-300"
        >
          Full-stack developer building and securing web apps.
        </RevealLine>
        <RevealLine
          as="p"
          index={5}
          className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-zinc-300"
        >
          I build with Next.js, TypeScript and Tailwind day to day — currently{" "}
          <ProjectLink name="CampusZen" />, <ProjectLink name="Kivo" /> and{" "}
          <ProjectLink name="Codingo" />.
        </RevealLine>
        <RevealLine index={6}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="#projects"
                aria-label="View projects — scroll to projects section"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                )}
              >
                View projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Open resume PDF in a new tab"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                )}
              >
                Resume
              </a>
            </div>
            <SocialLinks />
          </div>
        </RevealLine>
      </Reveal>
    </div>
  );
}
