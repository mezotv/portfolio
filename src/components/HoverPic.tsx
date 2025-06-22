import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function HoverPic({ children }: { children: React.ReactNode }) {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <img src="/images/me.webp" alt="Picture of Dominik Koch" className="w-full h-full object-cover rounded-md" />
      </HoverCardContent>
    </HoverCard>
  );
}