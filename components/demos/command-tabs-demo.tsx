"use client";

import { useState } from "react";
import { ClaudeIcon, OpenAiIcon } from "@/components/brand-icons";
import { CommandTabs } from "@/components/ui/command-tabs";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

const items = [
  {
    value: "claude",
    label: "Customize with Claude",
    icon: <ClaudeIcon />,
    command: 'claude "Ship this as a real product."',
  },
  {
    value: "codex",
    label: "Customize with Codex",
    icon: <OpenAiIcon />,
    command: 'codex "Ship this as a real product."',
  },
];

const highlightItems = [
  {
    value: "claude",
    label: "Customize with Claude",
    icon: <ClaudeIcon />,
    command: 'claude --model opus -p "Ship this as a real product."',
  },
  {
    value: "codex",
    label: "Customize with Codex",
    icon: <OpenAiIcon />,
    command: 'codex --model gpt-5.2-codex "Ship this as a real product."',
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
          value,
          label,
          icon: (
            <span className="flex items-center [&_svg]:size-4">{icon}</span>
          ),
        }))}
        label="Choose a tool"
        onValueChange={setTab}
        value={tab}
      />
    </div>
  );
}
