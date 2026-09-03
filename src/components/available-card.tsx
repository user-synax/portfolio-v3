import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AvailableCard() {
  return (
    <Card className="mt-16 border-border bg-surface transition-all duration-150 hover:-translate-y-px hover:border-accent/35">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
            Available for
          </p>
          <h2 className="font-display text-lg font-semibold">
            Full-stack roles & freelance work
          </h2>
          <p className="max-w-[42ch] text-[0.8125rem] leading-relaxed text-muted-foreground">
            Open to full-stack roles and freelance/contract work — targeting
            the India / Delhi-NCR market.
          </p>
        </div>
        <Button size="lg" className="shrink-0" render={<Link href="/contact" />}>
          Get in touch
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}