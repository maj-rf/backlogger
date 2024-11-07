import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useParams } from 'react-router-dom';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useRequiredParams = <T extends Record<string, unknown>>() => useParams() as T;
