import type { ReactNode } from "react";
// biome-ignore lint/performance/noNamespaceImport: Zod intended way to import
import * as z from "zod";
import { AddBrailleComponent } from "@/components/blog/add-braille-component";
import { BrailleDemo } from "@/components/blog/braille-demo";

type PostEmbed = (rawProps: Record<string, string>) => ReactNode;

const DEFAULT_BRAILLE_COMMAND =
  "npx shadcn@latest add @dominik-ui/braille-loader";

const addBrailleSchema = z
  .object({
    command: z.string().trim().min(1).default(DEFAULT_BRAILLE_COMMAND),
  })
  .catch({ command: DEFAULT_BRAILLE_COMMAND });

export const postComponents: Record<string, PostEmbed> = {
  BrailleDemo: () => <BrailleDemo />,
  AddBrailleComponent: (rawProps) => {
    const { command } = addBrailleSchema.parse(rawProps);
    return <AddBrailleComponent command={command} />;
  },
};
