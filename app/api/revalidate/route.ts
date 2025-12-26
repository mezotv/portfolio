import { NextResponse } from "next/server";
import type { PostEventData } from "@/lib/marble/types";
import { handleWebhookEvent, verifySignature } from "@/lib/marble/webhook";

export async function POST(request: Request) {
  const signature = request.headers.get("x-marble-signature");
  const secret = process.env.MARBLE_WEBHOOK_SECRET;

  if (!(secret && signature)) {
    return NextResponse.json(
      { error: "Secret or signature missing" },
      { status: 400 }
    );
  }

  const bodyText = await request.text();

  if (!verifySignature(secret, signature, bodyText)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(bodyText) as PostEventData;
  if (!(payload.event && payload.data)) {
    return Response.json(
      { error: "Invalid payload structure" },
      { status: 400 }
    );
  }

  try {
    const result = await handleWebhookEvent(payload);
    return NextResponse.json(result);
  } catch (err) {
    console.error("error", err);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
