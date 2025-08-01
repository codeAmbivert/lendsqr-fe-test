export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Formats a phone number by removing spaces, dashes, parentheses and converting +234 to 0
 * @param phoneNumber - The phone number string to format
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(phoneNumber?: string): string {
  if (!phoneNumber) return "";

  return phoneNumber
    .replace(/[\s\-()]/g, "") // Remove spaces, dashes, and parentheses
    .replace(/^\+234/, "0"); // Replace +234 country code with 0
}
