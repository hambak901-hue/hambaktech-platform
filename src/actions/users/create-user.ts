"use server";

import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const otherName = String(formData.get("otherName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const genderValue = String(formData.get("gender") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const roleId = String(formData.get("roleId") ?? "").trim();

  if (!firstName || !lastName || !email || !password || !roleId) {
    throw new Error("Required fields are missing.");
  }

  let gender: Gender | null = null;

  if (genderValue) {
    if (!Object.values(Gender).includes(genderValue as Gender)) {
      throw new Error("Invalid gender selected.");
    }

    gender = genderValue as Gender;
  }

  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        ...(phone ? [{ phone }] : []),
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
      otherName: otherName || null,
      email,
      phone: phone || null,
      gender,
      password: hashedPassword,
      roleId,
      status: "ACTIVE",
    },
  });

  redirect("/admin/users");
}