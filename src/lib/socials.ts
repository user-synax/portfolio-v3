import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

export type Social = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  placeholder?: boolean;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/user-synax", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/user-synax", icon: LinkedinIcon},
  { label: "X", href: "https://x.com/user_synax", icon: XIcon},
  { label: "Email", href: "mailto:user-synax@proton.me", icon: Mail },
];