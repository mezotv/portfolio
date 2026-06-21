import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InstallCommand } from "@/components/registry/install-command";
import { BrailleLoader } from "@/components/ui/braille-loader";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { BRAILLE_VARIANTS, REGISTRY_CLIENTS } from "@/lib/registry/constants";

export const metadata: Metadata = {
  title: "dominik-ui",
  description:
    "Reusable, shadcn-compatible React components from my personal registry.",
};

export default function UiLandingPage() {
  const items = REGISTRY_CLIENTS.map((client) => ({
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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-12 md:py-16">
      <section className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl tracking-tight">dominik-ui</h1>
        <p className="text-fd-muted-foreground">
          Reusable, shadcn-compatible components served from{" "}
          <span className="font-mono">dominikkoch.dev/r</span>. Install them
          with the shadcn CLI — you own the code, no runtime dependency.
        </p>
        <Link
          className="group mt-1 flex w-fit items-center gap-2 font-medium text-fd-foreground text-sm transition-colors hover:text-fd-muted-foreground"
          href="/ui/docs"
        >
          Read the docs
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">Expandable Tabs</h2>
          <p className="text-fd-muted-foreground text-sm">
            Animated icon tabs with a sliding active pill and an expanding
            label. Built on the shadcn tooltip and motion.
          </p>
        </div>
        <div className="rounded-xl border bg-fd-card p-6">
          <ExpandableTabs items={items} label="Choose your client" />
        </div>
        <InstallCommand component="expandable-tabs" />
        <Link
          className="w-fit text-fd-muted-foreground text-sm underline-offset-4 hover:text-fd-foreground hover:underline"
          href="/ui/docs/expandable-tabs"
        >
          View documentation →
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">Braille Loader</h2>
          <p className="text-fd-muted-foreground text-sm">
            An animated braille loading indicator with wave, typewriter,
            shimmer, and pulse variants.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {BRAILLE_VARIANTS.map((variant) => (
            <div
              className="flex flex-col gap-3 rounded-xl border bg-fd-card p-5"
              key={variant.name}
            >
              <span className="font-mono text-fd-muted-foreground text-xs">
                {variant.label}
              </span>
              <BrailleLoader
                className="text-fd-foreground text-lg"
                text="dominik"
                variant={variant.name}
              />
            </div>
          ))}
        </div>
        <InstallCommand component="braille-loader" />
        <Link
          className="w-fit text-fd-muted-foreground text-sm underline-offset-4 hover:text-fd-foreground hover:underline"
          href="/ui/docs/braille-loader"
        >
          View documentation →
        </Link>
      </section>
    </div>
  );
}
