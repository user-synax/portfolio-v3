import { Card, CardContent } from "@/components/ui/card";

/**
 * Shared shell for the home-page live-data widgets. Fixed min-height keeps
 * the row stable while server data loads/changes (no layout shift).
 */
export function WidgetCard({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={`min-h-[7.5rem] border-border bg-surface transition-all duration-150 hover:-translate-y-px hover:border-accent/35 ${className}`}
    >
      <CardContent className="flex h-full flex-col gap-1.5 p-4">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
          {label}
        </p>
        {children}
      </CardContent>
    </Card>
  );
}