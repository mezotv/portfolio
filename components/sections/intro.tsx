import Image from "next/image";
import { BrickverIcon } from "@/components/icons/brickver-icon";
import { CalIcon } from "@/components/icons/cal-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";
import { ModeToggle } from "@/components/mode-toggle";

const age = 21.311_538_647_36;

function companyFavicon(url: string) {
  const { hostname } = new URL(url);
  return new URL(`${hostname}.ico`, "https://icons.duckduckgo.com/ip3/").href;
}

function CompanyLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      className="group inline-flex items-center gap-1 whitespace-nowrap align-middle"
      href={href}
      rel="noopener"
      target="_blank"
    >
      <Image
        alt=""
        className="size-4 shrink-0"
        height={16}
        src={companyFavicon(href)}
        unoptimized
        width={16}
      />
      <span className="relative font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-900 after:transition-transform after:duration-300 after:ease-in-out group-hover:after:scale-x-100 dark:after:bg-zinc-100">
        {name}
      </span>
    </a>
  );
}

export function Intro() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-gambarino font-medium text-2xl tracking-tight">
          Hi, I'm Dominik Koch
        </h2>
        <div className="flex items-center gap-4">
          <a
            aria-label="View source code on GitHub"
            className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-zinc-600 dark:focus:ring-offset-black dark:hover:bg-zinc-800"
            href="https://github.com/mezotv/portfolio"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100" />
          </a>
          <ModeToggle />
        </div>
      </div>
      <p className="text-md">
        Software Engineer based in Germany,{" "}
        <span className="precise-age" id="age">
          {age}
        </span>{" "}
        years old with a passion for open source. Currently working on{" "}
        <CompanyLink href="https://www.usenotra.com/" name="Notra" /> and as a
        DX Engineer at{" "}
        <CompanyLink href="https://www.databricks.com/" name="Databricks" />
        {" working on "}
        <CompanyLink href="https://neon.com/" name="Neon" />
        {"."}
      </p>
      <div className="flex flex-row gap-4">
        <a
          className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
          href="https://cal.com/dominikkoch"
          rel="noopener"
          target="_blank"
        >
          <p className="sr-only">Cal.com</p>
          <CalIcon className="h-5 w-5 transition-all" />
        </a>
        <a
          className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
          href="https://github.com/mezotv"
          rel="noopener"
          target="_blank"
        >
          <p className="sr-only">GitHub</p>
          <GitHubIcon className="h-5 w-5 transition-all" />
        </a>
        <a
          className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
          href="https://twitter.com/dominikkoch"
          rel="noopener"
          target="_blank"
        >
          <p className="sr-only">Twitter</p>
          <TwitterIcon className="h-5 w-5 transition-all" />
        </a>
        <a
          className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
          href="https://linkedin.com/in/dominikkoch"
          rel="noopener"
          target="_blank"
        >
          <p className="sr-only">LinkedIn</p>
          <LinkedInIcon className="h-5 w-5 transition-all" />
        </a>
        <a
          className="overflow-hidden text-zinc-900 opacity-60 transition-all hover:opacity-100 dark:text-zinc-100"
          href="https://brickver.com/@dominik?ref=dominik"
          rel="noopener"
          target="_blank"
        >
          <p className="sr-only">Brickver</p>
          <BrickverIcon className="h-5 w-5 transition-all" />
        </a>
      </div>
    </section>
  );
}
