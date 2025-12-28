"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SectionTabs() {
  const pathname = usePathname();

  const getTabs = () => [
    { label: "Projects", href: "/", value: "projects" },
    { label: "Experience", href: "/experience", value: "experience" },
    { label: "Tools", href: "/tools", value: "tools" },
    { label: "Blog", href: "/blog", value: "blog" },
  ];

  const currentTab = (() => {
    if (pathname === "/" || pathname === "/projects") {
      return "projects";
    }
    if (pathname === "/experience") {
      return "experience";
    }
    if (pathname === "/tools") {
      return "tools";
    }
    if (pathname.startsWith("/blog")) {
      return "blog";
    }
    return "projects";
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
