import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { BrailleLoader } from "@/components/ui/braille-loader";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    BrailleLoader,
    ExpandableTabs,
    ...components,
  };
}
