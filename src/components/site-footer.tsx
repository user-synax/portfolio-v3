import ParticleText from "@/components/ParticleText";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-4 px-5 py-8">
        <div className="font-display">
          {/* Canvas can't resolve CSS vars — #e8b34b is the design.md accent. */}
          <ParticleText
            text="Ayush Developer"
            fontWeight={500}
            highlightColor="#e8b34b"
            style={{ minHeight: 180 }}
          />
        </div>
        <SocialLinks />
        <p className="text-[0.8125rem] text-faint">
          © {new Date().getFullYear()} Ayush · Built with Next.js, Tailwind &
          shadcn/ui
        </p>
      </div>
    </footer>
  );
}