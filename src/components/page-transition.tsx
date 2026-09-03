"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Route transition wrapper. Lives in the root layout so the header/footer
 * stay mounted while only the main content area transitions.
 *
 * Timings are the design.md motion tokens; fully disabled for
 * prefers-reduced-motion users (plain container, instant scroll).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Scroll to top on route change. (Server components can't scroll; this is
  // the only place that knows navigation happened.)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "instant" });
  }, [pathname, reduceMotion]);

  if (reduceMotion) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}