"use client";

import { useState } from "react";
import { BrailleLoader } from "@/components/ui/braille-loader";

const variants = [
  { name: "wave", label: "Wave" },
  { name: "typewriter", label: "Typewriter" },
  { name: "shimmer", label: "Shimmer" },
  { name: "pulse", label: "Pulse" },
] as const;

export function BrailleSpeedDemo() {
  const [speed, setSpeed] = useState(1);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {variants.map((variant) => (
          <div
            className="flex flex-col gap-3 rounded-xl border bg-fd-card p-5"
            key={variant.name}
          >
            <span className="font-mono text-fd-muted-foreground text-xs">
              {variant.label}
            </span>
            <BrailleLoader
              className="text-lg"
              speed={speed}
              text="dominik"
              variant={variant.name}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-xl border bg-fd-card p-5">
        <div className="flex items-center justify-between">
          <label
            className="font-mono text-fd-muted-foreground text-xs"
            htmlFor="braille-speed"
          >
            Speed
          </label>
          <span className="font-mono text-fd-muted-foreground text-xs tabular-nums">
            {speed.toFixed(2)}x
          </span>
        </div>
        <input
          className="w-full accent-fd-primary"
          id="braille-speed"
          max={3}
          min={0.25}
          onChange={(event) => setSpeed(Number(event.target.value))}
          step={0.25}
          type="range"
          value={speed}
        />
      </div>
    </div>
  );
}
