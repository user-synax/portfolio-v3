import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { WidgetCard } from "@/components/widget-card";

const CONDITIONS: Record<number, { label: string; Icon: LucideIcon }> = {
  0: { label: "Clear sky", Icon: Sun },
  1: { label: "Mainly clear", Icon: CloudSun },
  2: { label: "Partly cloudy", Icon: CloudSun },
  3: { label: "Overcast", Icon: Cloud },
  45: { label: "Foggy", Icon: CloudFog },
  48: { label: "Icy fog", Icon: CloudFog },
  51: { label: "Light drizzle", Icon: CloudDrizzle },
  53: { label: "Drizzle", Icon: CloudDrizzle },
  55: { label: "Heavy drizzle", Icon: CloudDrizzle },
  56: { label: "Freezing drizzle", Icon: CloudDrizzle },
  57: { label: "Freezing drizzle", Icon: CloudDrizzle },
  61: { label: "Light rain", Icon: CloudRain },
  63: { label: "Rain", Icon: CloudRain },
  65: { label: "Heavy rain", Icon: CloudRain },
  66: { label: "Freezing rain", Icon: CloudRain },
  67: { label: "Freezing rain", Icon: CloudRain },
  71: { label: "Light snow", Icon: CloudSnow },
  73: { label: "Snow", Icon: CloudSnow },
  75: { label: "Heavy snow", Icon: CloudSnow },
  77: { label: "Snow grains", Icon: CloudSnow },
  80: { label: "Rain showers", Icon: CloudRain },
  81: { label: "Rain showers", Icon: CloudRain },
  82: { label: "Violent showers", Icon: CloudRain },
  85: { label: "Snow showers", Icon: CloudSnow },
  86: { label: "Snow showers", Icon: CloudSnow },
  95: { label: "Thunderstorm", Icon: CloudLightning },
  96: { label: "Thunderstorm + hail", Icon: CloudLightning },
  99: { label: "Thunderstorm + hail", Icon: CloudLightning },
};

type OpenMeteoResponse = {
  current?: { temperature_2m?: number; weather_code?: number };
};

async function getDelhiWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,weather_code",
      // No API key needed. Cached server-side, revalidated every 10 minutes.
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return null;
    const data: OpenMeteoResponse = await res.json();
    if (data.current?.temperature_2m === undefined) return null;
    return {
      temp: Math.round(data.current.temperature_2m),
      code: data.current.weather_code ?? 0,
    };
  } catch {
    return null;
  }
}

export async function WeatherWidget() {
  const weather = await getDelhiWeather();
  const condition = weather ? CONDITIONS[weather.code] ?? CONDITIONS[0] : null;

  return (
    <WidgetCard label="Weather">
      {weather && condition ? (
        <>
          <p className="flex items-center gap-2 font-display text-2xl font-medium text-foreground">
            {weather.temp}°C
            <condition.Icon className="size-5 text-accent" aria-hidden="true" />
          </p>
          <p className="mt-auto text-[0.8125rem] text-muted-foreground">
            {condition.label}
          </p>
          <p className="font-mono text-[0.6875rem] text-faint">Delhi, India</p>
        </>
      ) : (
        <p className="mt-auto text-[0.8125rem] text-muted-foreground">
          Weather unavailable.
        </p>
      )}
    </WidgetCard>
  );
}