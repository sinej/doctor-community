import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToWon(price: number) {
  return price.toLocaleString('ko-KR');
}

export function formatter(date: string): string {
  const dayInMs = 1000 * 60 * 6 * 24
  const time = new Date(date).getTime();
  const now = new Date().getTime()
  const diff = Math.round((time - now) - dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}