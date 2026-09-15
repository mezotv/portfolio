export interface RegistryClient {
  label: string;
  src: string;
  value: string;
}

export type BrailleVariantName = "wave" | "typewriter" | "shimmer" | "pulse";

export interface BrailleVariant {
  label: string;
  name: BrailleVariantName;
}
