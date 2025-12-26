import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { PostEventData } from "./types";

const SHA256_PREFIX_REGEX = /^sha256=/;

export function verifySignature(
  secret: string,
  signatureHeader: string,
  bodyText: string
): boolean {
  const expectedHex = signatureHeader.replace(SHA256_PREFIX_REGEX, "");

  const computedHex = createHmac("sha256", secret)
    .update(bodyText)
    .digest("hex");

  const expected = Buffer.from(expectedHex, "hex");
  const computed = Buffer.from(computedHex, "hex");

  if (expected.length !== computed.length) {
    return false;
  }

  return timingSafeEqual(expected, computed);
}

export function handleWebhookEvent(payload: PostEventData) {
  const event = payload.event;
  const data = payload.data;

  if (event.startsWith("post")) {
    // Invalidate the posts list cache with immediate expiration
    revalidateTag("posts", { expire: 0 });

    // Invalidate the specific post cache if slug is provided
    if (data.slug) {
      revalidateTag(data.slug, { expire: 0 });
    }

    return {
      revalidated: true,
      now: Date.now(),
      message: `Revalidated tags: posts${data.slug ? `, ${data.slug}` : ""}`,
    };
  }

  return {
    revalidated: false,
    now: Date.now(),
    message: "Event ignored",
  };
}
