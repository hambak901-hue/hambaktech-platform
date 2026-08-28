import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.")
  .transform((value) => value.toLowerCase());

export const phoneSchema = z
  .string()
  .trim();

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeOptionalString(
  value?: string | null,
): string | undefined {
  const normalized = value?.trim();

  return normalized || undefined;
}

export function normalizeOptionalPhone(
  phone?: string | null,
): string | undefined {
  return normalizeOptionalString(phone);
}
