"use server";

import { revalidatePath } from "next/cache";

import { resetUserPassword } from "@/services/reset-password.service";

export async function resetUserPasswordAction(userId: string) {
  try {
    const temporaryPassword = await resetUserPassword(userId);

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);

    return {
      success: true,
      temporaryPassword,
      message: "Password reset successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to reset password.",
    };
  }
}