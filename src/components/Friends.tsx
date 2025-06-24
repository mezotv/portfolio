import { useTranslations } from "@/i18n/utils";
import { friendButtons } from "@/data/friends";

export function Friends({ lang = 'en' }: { lang?: string }) {
  const t = useTranslations(lang as 'en' | 'de');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('friends.buttons.title')}</h3>
        <div className="space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <code className="text-sm break-all text-zinc-800 dark:text-zinc-200">
              {`<a href="https://dominikkoch.dev/"><img src="https://dominikkoch.dev/images/friend/dominik.png" width="88" height="31" loading="lazy" alt="Dominik Koch 88x31 button"/></a>`}
            </code>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t('friends.buttons.description')}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {friendButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={button.imgSrc}
                width="88"
                height="31"
                loading="lazy"
                alt={button.alt}
                className="border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors rounded"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 