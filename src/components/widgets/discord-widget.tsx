import { WidgetCard } from "@/components/widget-card";

type LanyardResponse = {
  success: boolean;
  data?: {
    discord_status?: "online" | "idle" | "dnd" | "offline";
    discord_user?: { username?: string; global_name?: string | null };
    activities?: { type?: number; name?: string }[];
  };
};

const STATUS_META = {
  online: { label: "Online", dot: "bg-status-ok", glow: "shadow-[0_0_8px_rgba(74,222,128,0.7)]" },
  idle: { label: "Idle", dot: "bg-status-idle", glow: "shadow-[0_0_8px_rgba(251,191,36,0.7)]" },
  dnd: { label: "Do Not Disturb", dot: "bg-status-busy", glow: "shadow-[0_0_8px_rgba(248,113,113,0.7)]" },
  offline: { label: "Offline", dot: "bg-status-offline", glow: "" },
} as const;

async function getDiscordPresence() {
  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;
  if (!discordId) return null;

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
      headers: { "User-Agent": "synax.me" },
      // Presence changes often but we don't need it fresher than a minute.
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json: LanyardResponse = await res.json();
    if (!json.success || !json.data?.discord_user) return null;
    return json.data;
  } catch {
    return null;
  }
}

export async function DiscordWidget() {
  const presence = await getDiscordPresence();

  // Not configured (no NEXT_PUBLIC_DISCORD_ID) or Lanyard isn't tracking the
  // user yet — hide the widget entirely instead of showing a broken state.
  const user = presence?.discord_user;
  if (!presence?.discord_status || !user) return null;

  const status = STATUS_META[presence.discord_status];
  const name = user.global_name ?? user.username ?? "Ayush";
  const activity = presence.activities?.find(
    (a) => a.type === 0 && a.name, // "Playing …"
  );

  return (
    <WidgetCard label="Discord">
      <p className="flex items-center gap-2 text-sm text-foreground">
        <span
          aria-hidden="true"
          className={`size-2 rounded-full ${status.dot} ${status.glow}`}
        />
        <span className="truncate">{name}</span>
      </p>
      <p className="mt-auto text-[0.8125rem] text-muted-foreground">
        {activity ? `Playing ${activity.name}` : status.label}
      </p>
      <p className="font-mono text-[0.6875rem] text-faint">Lanyard</p>
    </WidgetCard>
  );
}