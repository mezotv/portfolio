import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSponsors } from "@/lib/github/sponsors";

function SponsorCard({
  login,
  name,
  avatarUrl,
  url,
}: {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
}) {
  const optimizedAvatarUrl = `${avatarUrl}&s=96`;

  return (
    <a
      className="group flex flex-col items-center rounded-lg bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Avatar className="mb-2 h-12 w-12 transition-transform group-hover:scale-105">
        <AvatarImage alt={name ?? login} src={optimizedAvatarUrl} />
        <AvatarFallback>
          {(name ?? login).charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="w-full truncate text-center font-medium text-sm">
        {name ?? login}
      </span>
      <span className="w-full truncate text-center text-muted-foreground text-xs">
        @{login}
      </span>
    </a>
  );
}

function SponsorCTA({ message }: { message: string }) {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <p>{message}</p>
      <a
        className="mt-4 inline-block rounded-lg bg-pink-500 px-4 py-2 text-white transition-colors hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700"
        href="https://github.com/sponsors/mezotv"
        rel="noopener noreferrer"
        target="_blank"
      >
        Become a Sponsor
      </a>
    </div>
  );
}

export async function Sponsors() {
  const { sponsors, totalCount, error } = await getSponsors();

  if (error === "GitHub token not configured") {
    return (
      <section className="space-y-4">
        <SponsorCTA message="Sponsors will be displayed once configured." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4">
        <div className="py-8 text-center text-muted-foreground">
          <p>Unable to load sponsors right now.</p>
          <p className="mt-2 text-sm">Please check back later.</p>
        </div>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return (
      <section className="space-y-4">
        <SponsorCTA message="No sponsors yet. Be the first!" />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Sponsors ({totalCount})</h2>
        <a
          className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="https://github.com/sponsors/mezotv"
          rel="noopener noreferrer"
          target="_blank"
        >
          Become a Sponsor
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {sponsors.map((sponsor) => (
          <SponsorCard
            avatarUrl={sponsor.avatarUrl}
            key={sponsor.login}
            login={sponsor.login}
            name={sponsor.name}
            url={sponsor.url}
          />
        ))}
      </div>

      <p className="pt-4 text-center text-muted-foreground text-sm">
        Thank you to all my sponsors for supporting my work!
      </p>
    </section>
  );
}
