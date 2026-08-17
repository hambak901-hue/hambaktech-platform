"use server";

import { revalidatePath } from "next/cache";

import { deleteUser } from "@/services/delete-user.service";

export async function deleteUserAction(userId: string) {
  try {
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
      message: "Unable to delete user.",
    };
  }
}
