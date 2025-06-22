import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE = {
  TITLE: 'Dominik Koch',
  DESCRIPTION: 'Software Engineer',
  URL: 'https://dominikkoch.dev',
};
