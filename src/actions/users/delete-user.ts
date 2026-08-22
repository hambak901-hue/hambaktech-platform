"use server";

import {
  PermissionAction,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { deleteUser } from "@/services/delete-user.service";

export async function deleteUserAction(
  userId: string,
) {
  try {
    const session = await requirePermission(
      "Users",
      PermissionAction.DELETE,
    );

    if (session.user.id === userId) {
      throw new Error(
        "You cannot delete your own account.",
      );
    }

    await deleteUser(userId);

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to delete user.",
    };
  }
}
