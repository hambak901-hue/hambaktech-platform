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
import { validatePassword } from "@/lib/validation/password";
import { createActivityLogInTransaction } from "@/services/activity-log.service";

export async function createUser(
  formData: FormData,
) {
  const session = await requirePermission(
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
  )
    .trim()
    .toLowerCase();

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

  validatePassword(password);

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

  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!role) {
    throw new Error(
      "Selected role does not exist.",
    );
  }

  if (role.type === RoleType.SUPER_ADMIN) {
    throw new Error(
      "SUPER_ADMIN cannot be created through User Management.",
    );
  }

  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        ...(phone
          ? [{ phone }]
          : []),
      ],
    },
  });

  if (existing) {
    throw new Error(
      "Email or phone already exists.",
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  await prisma.$transaction(
    async (tx) => {
      const user =
        await tx.user.create({
          data: {
            firstName,
            lastName,
            otherName:
              otherName || null,
            email,
            phone:
              phone || null,
            gender,
            password:
              hashedPassword,
            roleId,
            status: "ACTIVE",
          },
        });

      /*
       * Every non-SUPER_ADMIN user created
       * through User Management qualifies
       * for an automatically provisioned wallet.
       *
       * The user and wallet are created inside
       * the same database transaction.
       */
      const wallet =
        await tx.wallet.create({
          data: {
            userId: user.id,
            balance: 0,
            currency: "NGN",
            status: "ACTIVE",
          },
        });

      /*
       * Keep the user, wallet, and audit event
       * atomic. If any operation fails, all
       * database changes are rolled back.
       */
      await createActivityLogInTransaction(
        tx,
        {
          userId: session.user.id,
          action: "USER_CREATE",
          entity: "User",
          entityId: user.id,
          description:
            `Created user ${user.firstName} ${user.lastName} and provisioned an active wallet.`,
          metadata: {
            createdUserId: user.id,
            walletId: wallet.id,
            walletProvisioned: true,
            walletCurrency: wallet.currency,
          },
        },
      );
    },
  );

  redirect("/admin/users");
}