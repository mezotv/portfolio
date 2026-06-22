import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "dominik-ui",
    url: "/ui",
  },
  links: [
    {
      text: "Portfolio",
      url: "/",
    },
    {
      text: "Docs",
      url: "/ui/docs",
      active: "nested-url",
    },
    {
      text: "GitHub",
      url: "https://github.com/mezotv/portfolio",
      external: true,
    },
  ],
};
