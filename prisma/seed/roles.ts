import { PrismaClient, RoleType } from "@prisma/client";

export async function seedRoles(prisma: PrismaClient) {
  const roles = [
    {
      name: "Super Admin",
      type: RoleType.SUPER_ADMIN,
      description: "Full access to the system",
    },
    {
      name: "Admin",
      type: RoleType.ADMIN,
      description: "Administrative user",
    },
    {
      name: "Staff",
      type: RoleType.STAFF,
      description: "Company staff",
    },
    {
      name: "Student",
      type: RoleType.STUDENT,
      description: "Academy student",
    },
    {
      name: "Customer",
      type: RoleType.CUSTOMER,
      description: "Platform customer",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: role,
    });
  }

  console.log("✅ Roles Seeded");
}