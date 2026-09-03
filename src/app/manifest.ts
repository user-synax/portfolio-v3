import type { MetadataRoute } from "next";

/**
 * Web app manifest — reuses the existing site name/tagline and theme
 * colors from globals.css. Icon points at the existing src/app/icon.svg
 * (served by Next as the favicon); no new icon artwork is generated here.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayush — Full-stack developer in Delhi",
    short_name: "Ayush",
    description:
      "Self-taught full-stack developer in Delhi building CampusZen and Kivo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
