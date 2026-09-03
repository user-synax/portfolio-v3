import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Reveal, RevealLine } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ayush — open to full-stack roles and freelance work in India / Delhi-NCR.",
  alternates: {
    canonical: "https://synax.me/contact",
  },
  openGraph: {
    title: "Contact — Ayush",
    description:
      "Get in touch with Ayush — open to full-stack roles and freelance work in India / Delhi-NCR.",
    url: "https://synax.me/contact",
    siteName: "synax.me",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact — Ayush",
    description:
      "Get in touch with Ayush — open to full-stack roles and freelance work in India / Delhi-NCR.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-16 sm:pt-20">
      <Reveal className="flex flex-col gap-3">
        <RevealLine
          as="p"
          index={1}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent"
        >
          Say hello
        </RevealLine>
        <RevealLine
          as="h1"
          index={2}
          className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight"
        >
          Contact
        </RevealLine>
        <RevealLine
          as="p"
          index={3}
          className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
        >
          Open to full-stack roles, freelance and contract work — especially
          around India / Delhi-NCR. Drop a message below or find me on the
          usual places.
        </RevealLine>
      </Reveal>

      <ContactForm />

      <div className="mt-10 flex flex-col gap-3">
        <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          Elsewhere
        </h2>
        <SocialLinks />
      </div>
    </div>
  );
}