"use client";

import { HotkeysProvider, useHotkey } from "@tanstack/react-hotkeys";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();

  useHotkey(
    "M",
    () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    },
    { requireReset: true }
  );

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <HotkeysProvider>
        <ThemeHotkey />
        {children}
      </HotkeysProvider>
    </NextThemesProvider>
  );
}
