import type { CSSProperties } from "react";
import { getBrailleCharacters } from "@/lib/text-to-braille";
import { cn } from "@/lib/utils";

interface BrailleLoaderProps {
  text: string;
  className?: string;
  variant?: "wave" | "typewriter" | "shimmer" | "pulse";
  speed?: number;
}

const STEP_MS = 120;
const MIN_SPEED = 0.1;

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
  total: number,
  speed: number
): CSSProperties {
  const stepMs = STEP_MS / Math.max(speed, MIN_SPEED);
  const totalDuration = (total + 2) * stepMs;
  const delay = index * stepMs;

  if (variant === "pulse") {
    return {
      animation: `braille-pulse ${total * stepMs * 1.5}ms ease-in-out ${delay}ms infinite`,
    };
  }

  return {
    animation: `braille-${variant} ${totalDuration}ms ease-in-out ${delay}ms infinite`,
  };
}

export function BrailleLoader({
  text,
  className,
  variant = "wave",
  speed = 1,
}: BrailleLoaderProps) {
  const chars = getBrailleCharacters(text);

  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex font-mono text-muted-foreground", className)}
    >
      <style>{variantStyles[variant]}</style>
      {chars.map(({ char, key }, i) => (
        <span key={key} style={getAnimation(variant, i, chars.length, speed)}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
