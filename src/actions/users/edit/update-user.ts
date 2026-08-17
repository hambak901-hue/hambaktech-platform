"use server";

import { revalidatePath } from "next/cache";
import { updateUser } from "@/services/update-user.service";

export async function updateUserAction(formData: FormData) {
  const id = formData.get("id") as string;

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const otherName = formData.get("otherName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const roleId = formData.get("roleId") as string;
  const status = formData.get("status") as string;

  if (!id) {
    throw new Error("User ID is required.");
  }

  if (!firstName || !lastName || !email || !roleId || !status) {
    throw new Error("Please fill in all required fields.");
  }

  await updateUser(id, {
    firstName,
    lastName,
    otherName,
    email,
    phone,
    roleId,
    status,
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}`);
}