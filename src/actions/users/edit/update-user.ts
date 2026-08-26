"use server";

import {
  PermissionAction,
  UserStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { updateUser } from "@/services/update-user.service";

export async function updateUserAction(
  formData: FormData,
) {
  const id = String(
    formData.get("id") ?? "",
  );

  const firstName = String(
    formData.get("firstName") ?? "",
  ).trim();

  const lastName = String(
    formData.get("lastName") ?? "",
  ).trim();

  const otherName = String(
    formData.get("otherName") ?? "",
  ).trim();

  const email = String(
    formData.get("email") ?? "",
  ).trim();

  const phone = String(
    formData.get("phone") ?? "",
  ).trim();

  const roleId = String(
    formData.get("roleId") ?? "",
  ).trim();

  const statusValue = String(
    formData.get("status") ?? "",
  ).trim();

  if (!id) {
    throw new Error("User ID is required.");
  }

  await requirePermission(
    "Users",
    PermissionAction.UPDATE,
  );

  if (
    !firstName ||
    !lastName ||
    !email ||
    !roleId ||
    !statusValue
  ) {
    throw new Error(
      "Please fill in all required fields.",
    );
  }

  if (
    !Object.values(UserStatus).includes(
      statusValue as UserStatus,
    )
  ) {
    throw new Error("Invalid user status.");
  }

  await updateUser(id, {
    firstName,
    lastName,
    otherName: otherName || undefined,
    email,
    phone: phone || undefined,
    roleId,
    status: statusValue as UserStatus,
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}`);
}