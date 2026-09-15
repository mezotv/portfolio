"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SectionTabs() {
  const pathname = usePathname();

  const getTabs = () => [
    { href: "/", label: "About", value: "about" },
    { href: "/projects", label: "Projects", value: "projects" },
    { href: "/experience", label: "Experience", value: "experience" },
    { href: "/events", label: "Events", value: "events" },
    { href: "/blog", label: "Blog", value: "blog" },
  ];

  const tabs = getTabs();

  const currentTab =
    tabs.find((tab) => tab.href !== "/" && pathname.startsWith(tab.href))
      ?.value ?? "about";

  return (
    <Tabs defaultValue={currentTab} value={currentTab}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            nativeButton={false}
            render={<Link href={tab.href} />}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
