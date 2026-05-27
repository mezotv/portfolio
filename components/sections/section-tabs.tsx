"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SectionTabs() {
  const pathname = usePathname();

  const getTabs = () => [
    { label: "About", href: "/", value: "about" },
    { label: "Projects", href: "/projects", value: "projects" },
    { label: "Experience", href: "/experience", value: "experience" },
    { label: "Events", href: "/events", value: "events" },
    { label: "Blog", href: "/blog", value: "blog" },
  ];

  const currentTab = (() => {
    if (pathname === "/") {
      return "about";
    }
    if (pathname === "/projects") {
      return "projects";
    }
    if (pathname === "/experience") {
      return "experience";
    }
    if (pathname === "/events") {
      return "events";
    }
    if (pathname.startsWith("/blog")) {
      return "blog";
    }
    return "about";
  })();

  const tabs = getTabs();

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
