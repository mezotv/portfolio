import type { BrailleVariant, RegistryClient } from "@/lib/registry/types";

export const REGISTRY_NAMESPACE = "@dominik-ui";

export const REGISTRY_CLIENTS: RegistryClient[] = [
  { label: "React", src: "/tools/react.svg", value: "react" },
  { label: "Next.js", src: "/tools/nextjs_icon.svg", value: "nextjs" },
  { label: "Bun", src: "/tools/bun.svg", value: "bun" },
  {
    label: "Tailwind CSS",
    src: "/tools/tailwindcss.svg",
    value: "tailwindcss",
  },
  { label: "Neon", src: "/tools/neon.svg", value: "neon" },
  { label: "PostHog", src: "/tools/posthog.svg", value: "posthog" },
  { label: "Hono", src: "/tools/hono.svg", value: "hono" },
];

export const BRAILLE_VARIANTS: BrailleVariant[] = [
  { label: "Wave", name: "wave" },
  { label: "Typewriter", name: "typewriter" },
  { label: "Shimmer", name: "shimmer" },
  { label: "Pulse", name: "pulse" },
];
