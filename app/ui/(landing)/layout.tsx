import { HomeLayout } from "fumadocs-ui/layouts/home";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";

export default function UiLandingLayout({ children }: { children: ReactNode }) {
  return (
    <RootProvider theme={{ enabled: false }}>
      <HomeLayout {...baseOptions}>{children}</HomeLayout>
    </RootProvider>
  );
}
