import type { BrailleVariant, RegistryClient } from "@/lib/registry/types";

export const REGISTRY_NAMESPACE = "@dominik-ui";

export const REGISTRY_CLIENTS: RegistryClient[] = [
  { value: "react", label: "React", src: "/tools/react.svg" },
  { value: "nextjs", label: "Next.js", src: "/tools/nextjs_icon.svg" },
  { value: "bun", label: "Bun", src: "/tools/bun.svg" },
  {
    value: "tailwindcss",
    label: "Tailwind CSS",
    src: "/tools/tailwindcss.svg",
  },
  { value: "neon", label: "Neon", src: "/tools/neon.svg" },
  { value: "posthog", label: "PostHog", src: "/tools/posthog.svg" },
  { value: "hono", label: "Hono", src: "/tools/hono.svg" },
];

export const BRAILLE_VARIANTS: BrailleVariant[] = [
  { name: "wave", label: "Wave" },
  { name: "typewriter", label: "Typewriter" },
  { name: "shimmer", label: "Shimmer" },
  { name: "pulse", label: "Pulse" },
];
