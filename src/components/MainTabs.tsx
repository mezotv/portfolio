import React, { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Experience } from "./Experience"
import { Projects } from "./Projects"
import { Tools } from "./Tools"
import { QueryProvider } from "./QueryProvider"

// Dynamic import for MapComponent (heavy Leaflet/D3 dependencies) using React.lazy
const MapComponent = React.lazy(() => 
  import("@/components/MapComponent").then(mod => ({ default: mod.MapComponent }))
);

const MapLoadingFallback = () => (
  <div className="h-full flex items-center justify-center bg-muted/20 rounded">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-sm font-medium text-muted-foreground">Loading map...</span>
    </div>
  </div>
);

export function MainTabs() {
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
        <TabsTrigger className="cursor-pointer" value="projects">Projects</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="experience">Experience</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="tools">Tools</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <Projects />
      </TabsContent>
      <TabsContent value="experience">
        <Experience />
      </TabsContent>
      <TabsContent value="tools">
        <Tools />
      </TabsContent>
      <TabsContent value="other">
      <h2 className="text-2xl font-bold mb-4">Countries Visited</h2>
        <QueryProvider>
          <Suspense fallback={<MapLoadingFallback />}>
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