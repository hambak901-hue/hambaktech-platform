import bcrypt from "bcryptjs";
import {
  PrismaClient,
  RoleType,
  UserStatus,
} from "@prisma/client";

export async function seedAdmin(prisma: PrismaClient) {
  const existing = await prisma.user.findUnique({
    where: {
      email: process.env.SUPER_ADMIN_EMAIL!,
    },
  });

  if (existing) {
    console.log("✅ Super Admin already exists");
    return;
  }

  const role = await prisma.role.findFirst({
    where: {
      type: RoleType.SUPER_ADMIN,
    },
  });

  if (!role) {
    throw new Error("Super Admin role not found.");
  }

  const password = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD!,
    12
  );

  await prisma.user.create({
    data: {
      firstName: "Hambak",
      lastName: "Administrator",

      email: process.env.SUPER_ADMIN_EMAIL!,

      password,

      roleId: role.id,

      status: UserStatus.ACTIVE,

      emailVerified: true,
    },
  });

  console.log("✅ Super Admin Created");
}