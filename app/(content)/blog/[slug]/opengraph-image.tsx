import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/marble/queries";
import { getFaviconDataUri } from "@/utils/og-image";

export const alt = "Blog post by Dominik Koch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#18181b";
const FOREGROUND = "#fafafa";
const MUTED = "#a1a1a1";

interface OpenGraphImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const title = post?.title ?? "Dominik Koch";

  const faviconSrc = await getFaviconDataUri();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: BACKGROUND,
        color: FOREGROUND,
        padding: 96,
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: Satori only supports img */}
      <img alt="" height={72} src={faviconSrc} width={72} />
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <span style={{ fontSize: 32, color: MUTED }}>Dominik Koch</span>
    </div>,
    size
  );
}
