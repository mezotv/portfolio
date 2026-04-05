import { Marble } from "@usemarble/sdk";

const apiKey = process.env.MARBLE_API_KEY ?? "";

if (!apiKey) {
  console.warn("Missing MARBLE_API_KEY in environment variables");
}

export const marble = new Marble({
  apiKey,
});
