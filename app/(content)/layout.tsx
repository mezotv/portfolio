import Script from "next/script";
import { BrickverIcon } from "@/components/icons/brickver-icon";
import { CalIcon } from "@/components/icons/cal-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { SectionTabs } from "@/components/sections/section-tabs";
import { Sponsors } from "@/components/sections/sponsors";

const age = 20.940_063_403_62;

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <main className="relative z-10 mx-auto mt-16 max-w-xl px-4 py-4 text-zinc-900 dark:text-zinc-100">
          <section className="mb-8 flex flex-col gap-4">
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
              years old with a passion for open source. Self proclaimed 10x
              engineer currently working on{" "}
              <a
                className="relative font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 dark:after:bg-zinc-100"
                href="https://rivo.gg/"
                rel="noopener"
                target="_blank"
              >
                Rivo
              </a>{" "}
              and{" "}
              <a
                className="relative font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-900 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 dark:after:bg-zinc-100"
                href="https://usenotra.com/"
                rel="noopener"
                target="_blank"
              >
                Notra
              </a>
              .
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
                className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
                href="https://brickver.com/@dominik?ref=dominik"
                rel="noopener"
                target="_blank"
              >
                <p className="sr-only">Brickver</p>
                <BrickverIcon className="h-5 w-5 transition-all" />
              </a>
            </div>
          </section>

          <section className="mt-8 flex flex-col gap-8">
            <SectionTabs />
            {children}
          </section>

          <section className="mt-12">
            <Sponsors />
          </section>
        </main>
        <footer className="relative z-50 mt-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-2 px-4 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:text-left">
            <p className="text-sm text-zinc-900 dark:text-muted-foreground">
              Made with ❤️ by{" "}
              <span className="font-bold text-black/90 dark:text-zinc-100">
                Dominik Koch
              </span>
            </p>
            <p className="text-sm text-zinc-900 dark:text-muted-foreground">
              Inspired by{" "}
              <a
                className="font-bold text-black/90 underline transition-opacity hover:opacity-75 dark:text-zinc-100"
                href="https://ahmet.studio/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Ahmet Kilinc
              </a>
            </p>
          </div>
        </footer>
      </div>
      <Script src="/age.js" />
    </>
  );
}
