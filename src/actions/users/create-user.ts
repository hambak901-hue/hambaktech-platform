"use server";

import {
  Gender,
  PermissionAction,
  RoleType,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { requirePermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function createUser(
  formData: FormData,
) {
  await requirePermission(
    "Users",
    PermissionAction.CREATE,
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

  const genderValue = String(
    formData.get("gender") ?? "",
  ).trim();

  const password = String(
    formData.get("password") ?? "",
  );

  const roleId = String(
    formData.get("roleId") ?? "",
  ).trim();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !roleId
  ) {
    throw new Error(
      "Required fields are missing.",
    );
  }

  if (password.length < 8) {
    throw new Error(
      "Password must be at least 8 characters.",
    );
  }

  let gender: Gender | null = null;

  if (genderValue) {
    if (
      !Object.values(Gender).includes(
        genderValue as Gender,
      )
    ) {
      throw new Error("Invalid gender selected.");
    }

    gender = genderValue as Gender;
  }

  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!role) {
    throw new Error("Selected role does not exist.");
  }

  if (role.type === RoleType.SUPER_ADMIN) {
    throw new Error(
      "SUPER_ADMIN cannot be created through User Management.",
    );
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
    throw new Error(
      "Email or phone already exists.",
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    12,
  );

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
