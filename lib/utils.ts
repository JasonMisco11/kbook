import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-GH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * Generate a unique job reference number
 * Format: KS-YYYYMMDD-XXXX
 */
export function generateRef(): string {
  const now = new Date()
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `KS-${datePart}-${randomPart}`
}

/**
 * Format currency in Ghanaian Cedis
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount)
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate a string to a given length
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
