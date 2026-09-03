export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Public site / demo link, if any. */
  site?: string;
  /** Public repo link, if any. */
  repo?: string;
  /** True when the repo exists but isn't public yet — renders a muted placeholder. */
  repoPlaceholder?: boolean;
};

/**
 * Project list for /projects.
 *
 * TODO(ayush): drop in the remaining repo/site URLs as they go public.
 * Entries with `repoPlaceholder: true` render as muted "coming soon" text
 * on purpose.
 */
export const projects: Project[] = [
  {
    name: "CampusZen",
    tagline: "A verified student social network for Indian colleges.",
    description:
      "Full Stack Social Media, Tons of features, Real-time chat, voice chat, and a cosmetic economy for verified college students. Currently at soft-launch stage.",
    tags: ["Next.js", "TypeScript", "Realtime", "Voice chat"],
    site: "https://campuszen.tech",
    repo: "https://github.com/user-synax/campusZen",
  },
  {
    name: "Kivo",
    tagline: "A realtime chat platform built around deep customization.",
    description:
      "Combines WhatsApp-style DMs and groups with Discord-style Spaces and Channels. The core idea: let users customize everything about how they chat.",
    tags: ["Realtime", "Chat", "WebSocket", "Customization"],
    site: "https://kivo.usersynax.dev",
    repo: "https://github.com/user-synax/Kivo",
  },
  {
    name: "CPGRAM Recreate",
    tagline: "Hackathon redesign of India's CPGRAMS grievance portal.",
    description:
      "A from-scratch reimagining of the government grievance redressal portal, built for a hackathon with a cleaner, more usable flow.",
    tags: ["Next.js", "TypeScript", "Hackathon", "Govtech"],
    site: "https://cpgram.usersynax.dev",
    repo: "https://github.com/user-synax/cpgram-recreate",
  }
];