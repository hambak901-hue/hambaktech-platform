import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 8;

export const passwordSchema = z
  .string()
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  );

export function validatePassword(
  password: string,
): string {
  const result = passwordSchema.safeParse(password);

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message ??
        "Invalid password.",
    );
  }

  return result.data;
}import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 8;

export const passwordSchema = z
  .string()
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  );

export function validatePassword(
  password: string,
): string {
  const result = passwordSchema.safeParse(password);

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message ??
        "Invalid password.",
    );
  }

  return result.data;
}import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 8;

export const passwordSchema = z
  .string()
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  );

export function validatePassword(
  password: string,
): string {
  const result = passwordSchema.safeParse(password);

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message ??
        "Invalid password.",
    );
  }

  return result.data;
}