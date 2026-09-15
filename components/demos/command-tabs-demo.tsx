"use client";

import { useState } from "react";
import { ClaudeIcon, OpenAiIcon } from "@/components/brand-icons";
import { CommandTabs } from "@/components/ui/command-tabs";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

const items = [
  {
    command: 'claude "Ship this as a real product."',
    icon: <ClaudeIcon />,
    label: "Customize with Claude",
    value: "claude",
  },
  {
    command: 'codex "Ship this as a real product."',
    icon: <OpenAiIcon />,
    label: "Customize with Codex",
    value: "codex",
  },
];

const highlightItems = [
  {
    command: 'claude --model opus -p "Ship this as a real product."',
    icon: <ClaudeIcon />,
    label: "Customize with Claude",
    value: "claude",
  },
  {
    command: 'codex --model gpt-5.2-codex "Ship this as a real product."',
    icon: <OpenAiIcon />,
    label: "Customize with Codex",
    value: "codex",
  },
];

export function CommandTabsHighlightDemo() {
  return <CommandTabs highlight items={highlightItems} />;
}

export function CommandTabsDemo({
  tabsPosition = "bottom",
  highlight = false,
}: {
  tabsPosition?: "top" | "bottom";
  highlight?: boolean;
}) {
  return (
    <CommandTabs
      highlight={highlight}
      items={items}
      tabsPosition={tabsPosition}
    />
  );
}

export function CommandTabsExpandableDemo() {
  const [tab, setTab] = useState("claude");

  return (
    <div className="flex w-full flex-col">
      <CommandTabs
        items={items}
        onValueChange={setTab}
        tabsPosition="none"
        value={tab}
      />
      <ExpandableTabs
        className="-mt-px rounded-t-none border-t-0"
        items={items.map(({ value, label, icon }) => ({
          icon: (
            <span className="flex items-center [&_svg]:size-4">{icon}</span>
          ),
          label,
          value,
        }))}
        label="Choose a tool"
        onValueChange={setTab}
        value={tab}
      />
    </div>
  );
}
