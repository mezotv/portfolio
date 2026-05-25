import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// These spell out Notra, change them if you want to: https://www.byronknoll.com/braille.html
const BRAILLE_CHARS = ["⠠", "⠝", "⠕", "⠞", "⠗", "⠁"];

interface BrailleLoaderProps {
  className?: string;
  variant?: "wave" | "typewriter" | "shimmer" | "pulse";
  label?: string;
}

const STEP_MS = 120;

const variantStyles: Record<
  NonNullable<BrailleLoaderProps["variant"]>,
  string
> = {
  wave: `@keyframes braille-wave {
    0%, 100% { opacity: 0.15; }
    12%, 25% { opacity: 1; }
    37% { opacity: 0.15; }
  }`,
  typewriter: `@keyframes braille-typewriter {
    0%, 10% { opacity: 0; }
    12% { opacity: 1; }
    80% { opacity: 1; }
    90%, 100% { opacity: 0; }
  }`,
  shimmer: `@keyframes braille-shimmer {
    0%, 100% { opacity: 0.15; }
    12%, 25% { opacity: 1; }
    37% { opacity: 0.4; }
    50% { opacity: 0.15; }
  }`,
  pulse: `@keyframes braille-pulse {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 1; }
  }`,
};

function getAnimation(
  variant: NonNullable<BrailleLoaderProps["variant"]>,
  index: number,
  total: number
): CSSProperties {
  const totalDuration = (total + 2) * STEP_MS;
  const delay = index * STEP_MS;

  if (variant === "pulse") {
    return {
      animation: `braille-pulse ${total * STEP_MS * 1.5}ms ease-in-out ${delay}ms infinite`,
    };
  }

  return {
    animation: `braille-${variant} ${totalDuration}ms ease-in-out ${delay}ms infinite`,
  };
}

export function BrailleLoader({
  className,
  variant = "wave",
  label,
}: BrailleLoaderProps) {
  const allChars = label
    ? [...BRAILLE_CHARS, " ", ...label.split("")]
    : BRAILLE_CHARS;
  const total = allChars.length;

  return (
    <output
      aria-label="Loading"
      className={cn("inline-flex font-mono text-muted-foreground", className)}
    >
      <style>{variantStyles[variant]}</style>
      {allChars.map((char, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: The loader renders a fixed stateless character sequence.
        <span key={i} style={getAnimation(variant, i, total)}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </output>
  );
}
