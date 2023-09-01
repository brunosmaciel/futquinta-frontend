import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
export function cn(...args: ClassValue[]): string {
  return twMerge(clsx(args));
}
