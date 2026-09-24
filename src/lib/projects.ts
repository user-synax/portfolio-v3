export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Public site / demo link, if any. */
  site?: string;
  /** Public repo link, if any. */
  repo?: string;
};

/**
 * Project list for /projects.
 *
 * TODO(ayush): drop in the remaining repo/site URLs as they go public.
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
    name: "Codingo",
    tagline: "A free, Duolingo-style web app for learning programming",
    description: `A free, Duolingo-style web app for learning programming.
Bite-sized lessons. Real code in your browser. Gamified. Fun. For everyone.`,
    tags: ["Next.js", "TypeScript", "MongoDB", "Bun"],
    site: "https://coding.synax.me",
    repo: "https://github.com/user-synax/codingo",
  },
];
