import React, { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Experience } from "./Experience"
import { Projects } from "./Projects"
import { Tools } from "./Tools"
import { QueryProvider } from "./QueryProvider"
import { useTranslations } from "@/i18n/utils"

// Dynamic import for MapComponent (heavy Leaflet/D3 dependencies) using React.lazy
const MapComponent = React.lazy(() => 
  import("@/components/MapComponent").then(mod => ({ default: mod.MapComponent }))
);

const MapLoadingFallback = ({ lang }: { lang: string }) => {
  const t = useTranslations(lang as 'en' | 'de');
  return (
    <div className="h-full flex items-center justify-center bg-muted/20 rounded">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">{t('loading.map')}</span>
      </div>
    </div>
  );
};

export function MainTabs({ lang = 'en' }: { lang?: string }) {
  const t = useTranslations(lang as 'en' | 'de');
  const visitedCountries = [
    "US",
    "DE",
    "GB",
    "IT",
    "ES",
    "AT",
    "CH",
    "TR",
    "EG",
    "GR",
    "FR"
  ];

  return (
    <Tabs defaultValue="projects" className="w-full max-w-3xl mb-8">
      <TabsList className="mb-4">
        <TabsTrigger className="cursor-pointer" value="projects">{t('tabs.projects')}</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="experience">{t('tabs.experience')}</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="tools">{t('tabs.tools')}</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="other">{t('tabs.other')}</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <Projects lang={lang} />
      </TabsContent>
      <TabsContent value="experience">
        <Experience lang={lang} />
      </TabsContent>
      <TabsContent value="tools">
        <Tools lang={lang} />
      </TabsContent>
      <TabsContent value="other">
      <h2 className="text-2xl font-bold mb-4">{t('other.countries')}</h2>
        <QueryProvider>
          <Suspense fallback={<MapLoadingFallback lang={lang} />}>
            <MapComponent 
              height="400px" 
              visitedCountries={visitedCountries}
              isLoading={false} 
            />
          </Suspense>
        </QueryProvider>
      </TabsContent>
    </Tabs>
  )
} 