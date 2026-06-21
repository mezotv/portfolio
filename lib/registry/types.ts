export interface RegistryClient {
  value: string;
  label: string;
  src: string;
}

export type BrailleVariantName = "wave" | "typewriter" | "shimmer" | "pulse";

export interface BrailleVariant {
  name: BrailleVariantName;
  label: string;
}
