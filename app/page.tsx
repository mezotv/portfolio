import { ModeToggle } from "@/components/mode-toggle";
import { GitHubIcon } from "@/components/icons/github-icon";
import { CalIcon } from "@/components/icons/cal-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { BrickverIcon } from "@/components/icons/brickver-icon";
import Script from "next/script";

export default function Page() {
    const age = 20
  return (
    <><div
          className="relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
      >
          <main
              className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-4 mt-16 relative z-10"
          >
              <section className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-medium tracking-tight font-gambarino">
                          Hi, I'm Dominik Koch
                      </h1>
                      <div className="flex items-center gap-4">
                          <a
                              href="https://github.com/mezotv/portfolio"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-md w-9 h-9 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black transition-all cursor-pointer flex items-center justify-center group"
                              aria-label="View source code on GitHub"
                          >
                              <GitHubIcon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                          </a>
                          <ModeToggle />
                      </div>
                  </div>
                  <p className="text-md">
                      Software Engineer based in Germany,{" "}
                      <span id="age" className="precise-age">
                          {age}
                      </span>{" "}
                      years old with a passion for open source. Self proclaimed{" "}
                      <span className="relative after:absolute after:bg-yellow-400 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out">
                          10x engineer
                      </span>{" "}
                      currently working on{" "}
                      <a
                          href="https://rivo.gg/"
                          target="_blank"
                          className="font-bold relative after:absolute after:bg-zinc-900 dark:after:bg-zinc-100 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
                      >
                          Rivo
                      </a>{" "}
                      and{" "}
                      <a
                          href="https://wouldyoubot.gg/"
                          target="_blank"
                          className="font-bold relative after:absolute after:bg-zinc-900 dark:after:bg-zinc-100 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
                      >
                          Would You Bot
                      </a>
                      .
                  </p>
                  <div className="flex flex-row gap-4">
                      <a
                          href="https://cal.com/dominikkoch"
                          target="_blank"
                          className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                          <p className="sr-only">Cal.com</p>
                          <CalIcon className="h-5 w-5 transition-all" />
                      </a>
                      <a
                          href="https://github.com/mezotv"
                          target="_blank"
                          className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                          <p className="sr-only">GitHub</p>
                          <GitHubIcon className="h-5 w-5 transition-all" />
                      </a>
                      <a
                          href="https://twitter.com/dominikkoch"
                          target="_blank"
                          className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                          <p className="sr-only">Twitter</p>
                          <TwitterIcon className="h-5 w-5 transition-all" />
                      </a>
                      <a
                          href="https://linkedin.com/in/dominikkoch"
                          target="_blank"
                          className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                          <p className="sr-only">LinkedIn</p>
                          <LinkedInIcon className="h-5 w-5 transition-all" />
                      </a>
                      <a
                          href="https://brickver.com/@dominik?ref=dominik"
                          target="_blank"
                          className="overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                          <p className="sr-only">Brickver</p>
                          <BrickverIcon className="h-5 w-5 transition-all" />
                      </a>
                  </div>
              </section>

              <section className="mt-8">

              </section>
          </main>
          <footer className="mt-8 relative z-50">
              <div
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-2 sm:gap-0 max-w-xl mx-auto px-4 py-4 text-center sm:text-left"
              >
                  <p className="text-zinc-900 dark:text-muted-foreground text-sm">
                      Made with
                      <span className="text-red-500 dark:text-red-400">❤️</span>
                      by
                      <span className="font-bold text-black/90 dark:text-zinc-100"
                      >Dominik Koch</span>
                  </p>
                  <p className="text-zinc-900 dark:text-muted-foreground text-sm">
                      Inspired by
                      <a
                          href="https://ahmet.studio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-black/90 dark:text-zinc-100 relative after:absolute after:bg-zinc-900 dark:after:bg-zinc-100 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
                      >Ahmet Kilinc</a>!
                  </p>
              </div>
          </footer>
      </div>
      <Script src="/age.js"/>
          </>

  );
}
