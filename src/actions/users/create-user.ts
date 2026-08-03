"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));
  const otherName = String(formData.get("otherName") ?? "");
  const email = String(formData.get("email"));
  const phone = String(formData.get("phone"));
  const gender = String(formData.get("gender"));
  const password = String(formData.get("password"));

  // Role ID is a UUID string, NOT a number
  const roleId = String(formData.get("roleId"));

  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { phone },
      ],
    },
  });

  if (existing) {
    throw new Error("Email or phone already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      otherName,
      email,
      phone,
      gender: gender as any,
      password: hashedPassword,
      roleId,
      status: "ACTIVE",
    },
  });

  redirect("/admin/users");
}