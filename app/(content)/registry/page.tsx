import type { Metadata } from "next";
import Image from "next/image";
import { CodeBlockCommand } from "@/components/code-block-command";
import { BrailleLoader } from "@/components/ui/braille-loader";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { convertNpmCommand } from "@/lib/convert-npm-command";

export const metadata: Metadata = {
  title: "Registry",
  description:
    "Reusable shadcn-compatible components from my personal registry.",
};

const clients = [
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

const brailleVariants = [
  { name: "wave", label: "Wave" },
  { name: "typewriter", label: "Typewriter" },
  { name: "shimmer", label: "Shimmer" },
  { name: "pulse", label: "Pulse" },
] as const;

function InstallCommand({ component }: { component: string }) {
  const commands = convertNpmCommand(
    `npx shadcn@latest add @dominik-ui/${component}`
  );

  return <CodeBlockCommand {...commands} />;
}

export default function RegistryPage() {
  const items = clients.map((client) => ({
    value: client.value,
    label: client.label,
    icon: (
      <Image
        alt={client.label}
        className="size-7 shrink-0 rounded-md object-contain"
        height={28}
        src={client.src}
        width={28}
      />
    ),
  }));

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">Registry</h1>
        <p className="text-muted-foreground text-sm">
          Reusable, shadcn-compatible components served from{" "}
          <span className="font-mono">dominikkoch.dev/r</span>. Install them
          with the shadcn CLI.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">Expandable Tabs</h2>
          <p className="text-muted-foreground text-sm">
            Animated icon tabs with a sliding active pill and an expanding
            label. Built on the shadcn tooltip and motion.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <ExpandableTabs items={items} label="Choose your client" />
        </div>
        <InstallCommand component="expandable-tabs" />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">Braille Loader</h2>
          <p className="text-muted-foreground text-sm">
            An animated braille loading indicator with wave, typewriter,
            shimmer, and pulse variants.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {brailleVariants.map((variant) => (
            <div
              className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5"
              key={variant.name}
            >
              <span className="font-mono text-muted-foreground text-xs">
                {variant.label}
              </span>
              <BrailleLoader
                className="text-foreground text-lg"
                text="dominik"
                variant={variant.name}
              />
            </div>
          ))}
        </div>
        <InstallCommand component="braille-loader" />
      </section>
    </div>
  );
}
