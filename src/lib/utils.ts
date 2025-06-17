import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const getInitials = (fullName?: string) => {
  if (!fullName) return 'NA'

  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
