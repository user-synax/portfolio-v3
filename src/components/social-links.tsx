import { socials } from "@/lib/socials";

/** Icon-only social row. Placeholder links render as muted non-links. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map((social) => {
        const Icon = social.icon;
        if (social.placeholder) {
          return (
            <li key={social.label}>
              <span
                title={`${social.label} — coming soon`}
                className="flex size-8 cursor-not-allowed items-center justify-center rounded-md border border-border text-faint"
                aria-disabled="true"
              >
                <Icon className="size-4" />
                <span className="sr-only">{social.label} (coming soon)</span>
              </span>
            </li>
          );
        }
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              title={social.label}
              className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:border-accent/50 hover:text-accent"
            >
              <Icon className="size-4" />
              <span className="sr-only">{social.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}