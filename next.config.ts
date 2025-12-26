import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
};

export default async function (): Promise<NextConfig> {
  return await withLingo(nextConfig, {
    sourceRoot: "./app",
    sourceLocale: "en",
    targetLocales: ["de"],
    models: "lingo.dev",
    dev: {
      usePseudotranslator: true,
    },
  });
}

