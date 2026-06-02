import { BrailleLoader } from "@/components/ui/braille-loader";

const DEMO_TEXT = "notra";

const variants = [
  { name: "wave", label: "Wave" },
  { name: "typewriter", label: "Typewriter" },
  { name: "shimmer", label: "Shimmer" },
  { name: "pulse", label: "Pulse" },
] as const;

export function BrailleDemo() {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2" id="braille-demo">
      {variants.map((variant) => (
        <div
          className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5"
          key={variant.name}
        >
          <span className="font-mono text-muted-foreground text-xs">
            {variant.label}
          </span>
          <BrailleLoader
            className="text-foreground text-lg"
            text={DEMO_TEXT}
            variant={variant.name}
          />
        </div>
      ))}
    </div>
  );
}
