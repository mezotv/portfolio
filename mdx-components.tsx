import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  CommandTabsDemo,
  CommandTabsExpandableDemo,
  CommandTabsHighlightDemo,
} from "@/components/demos/command-tabs-demo";
import { PermissionFormDemo } from "@/components/demos/permission-form-demo";
import { ComponentPreview } from "@/components/preview/component-preview";
import { InstallCommand } from "@/components/registry/install-command";
import { BrailleLoader } from "@/components/ui/braille-loader";
import { CommandTabs } from "@/components/ui/command-tabs";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import {
  PermissionOption,
  PermissionRow,
  PermissionSelector,
} from "@/components/ui/permission-selector";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    BrailleLoader,
    CommandTabs,
    CommandTabsDemo,
    CommandTabsExpandableDemo,
    CommandTabsHighlightDemo,
    ExpandableTabs,
    PermissionSelector,
    PermissionRow,
    PermissionOption,
    PermissionFormDemo,
    ComponentPreview,
    InstallCommand,
    ...components,
  };
}
