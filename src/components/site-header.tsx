"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-md px-2.5 py-1 text-sm transition-colors duration-150 ${
        active
          ? "bg-accent-soft font-medium text-accent"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[640px] items-center justify-between px-5">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight transition-colors duration-150 hover:text-accent"
        >
          Ayush
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </header>
  );
}