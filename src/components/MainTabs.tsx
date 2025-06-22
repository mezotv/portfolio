import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Experience } from "./Experience"
import { Tools } from "./Tools"

export function MainTabs() {
  return (
    <Tabs defaultValue="projects" className="w-full max-w-3xl mb-8">
      <TabsList className="mb-4">
        <TabsTrigger className="cursor-pointer" value="projects">Projects</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="experience">Experience</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="tools">Tools</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <div>
          <h2>Projects</h2>
        </div>
      </TabsContent>
      <TabsContent value="experience">
        <Experience />
      </TabsContent>
      <TabsContent value="tools">
        <Tools />
      </TabsContent>
    </Tabs>
  )
} 