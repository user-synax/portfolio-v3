import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-4 px-5 py-8">
        <SocialLinks />
        <p className="text-[0.8125rem] text-faint">
          © {new Date().getFullYear()} Ayush · Built with Next.js, Tailwind &
          shadcn/ui
        </p>
      </div>
    </footer>
  );
}