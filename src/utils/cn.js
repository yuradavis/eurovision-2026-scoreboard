/**
 * Lightweight className merging utility.
 * Filters out falsy values and joins the rest.
 * Replace with clsx/tailwind-merge later if needed.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
