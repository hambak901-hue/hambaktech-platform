"use server";

import {
  Gender,
  RoleType,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { normalizeEmail } from "@/lib/validation/user";

import { prisma } from "@/lib/prisma";

const MIN_PASSWORD_LENGTH = 8;

export async function registerUserAction(
  formData: FormData,
) {
  const firstName = String(
    formData.get("firstName") ?? "",
  ).trim();

  const lastName = String(
    formData.get("lastName") ?? "",
  ).trim();

  const otherName = String(
    formData.get("otherName") ?? "",
  ).trim();

  const email = normalizeEmail(
    String(formData.get("email") ?? ""),
  );

  const phone = String(
    formData.get("phone") ?? "",
  ).trim();

  const genderValue = String(
    formData.get("gender") ?? "",
  ).trim();

  const password = String(
    formData.get("password") ?? "",
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? "",
  );

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    throw new Error(
      "Please complete all required fields.",
    );
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      "Password must be at least 8 characters.",
    );
  }

  if (password !== confirmPassword) {
    throw new Error(
      "Password and confirmation do not match.",
    );
  }

  let gender: Gender | null = null;

  if (genderValue) {
    if (
      !Object.values(Gender).includes(
        genderValue as Gender,
      )
    ) {
      throw new Error(
        "Invalid gender selected.",
      );
    }

    gender = genderValue as Gender;
  }

  const existingUser =
    await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          ...(phone
            ? [
                {
                  phone,
                },
              ]
            : []),
        ],
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error(
        "An account with this email already exists.",
      );
    }

    throw new Error(
      "An account with this phone number already exists.",
    );
  }

  const customerRole =
  await prisma.role.findFirst({
    where: {
      type: RoleType.CUSTOMER,
    },
    select: {
      id: true,
      type: true,
    },
  });

  if (!customerRole) {
    throw new Error(
      "Customer role is not configured.",
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      otherName: otherName || null,
      email,
      phone: phone || null,
      gender,
      password: hashedPassword,

      // Public registration always creates CUSTOMER.
      roleId: customerRole.id,

      // Email verification is not implemented yet.
      status: "ACTIVE",
    },
  });

  redirect(
    "/login?registered=true",
  );
}
