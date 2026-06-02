import Script from "next/script";
import { ContentHeader } from "@/components/sections/content-header";
import { Sponsors } from "@/components/sections/sponsors";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <main className="relative z-10 mx-auto mt-16 max-w-xl px-4 py-4 text-zinc-900 dark:text-zinc-100">
          <section className="flex flex-col gap-8">
            <ContentHeader />
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
          </div>
        </footer>
      </div>
      <Script src="/age.js" />
    </>
  );
}
