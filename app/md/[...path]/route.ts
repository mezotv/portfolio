import { createDualmarkRouteHandler } from "@dualmark/nextjs";
import { dualmarkConfig } from "@/lib/dualmark";

const handler = createDualmarkRouteHandler(dualmarkConfig);

export const GET = handler.GET;
export const generateStaticParams = handler.generateStaticParams;
