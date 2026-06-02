import type { CSSProperties } from "react";
import { textToBraille } from "@/lib/text-to-braille";
import { cn } from "@/lib/utils";

interface BrailleLoaderProps {
  text: string;
  className?: string;
  variant?: "wave" | "typewriter" | "shimmer" | "pulse";
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
  text,
  className,
  variant = "wave",
}: BrailleLoaderProps) {
  const chars = [...textToBraille(text)];

  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex font-mono text-muted-foreground", className)}
    >
      <style>{variantStyles[variant]}</style>
      {chars.map((char, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: The loader renders a fixed stateless character sequence.
        <span key={i} style={getAnimation(variant, i, chars.length)}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
