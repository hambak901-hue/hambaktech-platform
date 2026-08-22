"use server";

import {
  PermissionAction,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { resetUserPassword } from "@/services/reset-password.service";

export async function resetUserPasswordAction(
  userId: string,
) {
  try {
    await requirePermission(
      "Users",
      PermissionAction.UPDATE,
    );

    const temporaryPassword =
      await resetUserPassword(userId);

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);

    return {
      success: true,
      temporaryPassword,
      message:
        "Password reset successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to reset password.",
    };
  }
}
