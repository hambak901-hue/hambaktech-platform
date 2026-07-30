import { PrismaClient } from "@prisma/client";

import { seedCompany } from "./seed/company";
import { seedWebsite } from "./seed/website";
import { seedRoles } from "./seed/roles";
import { seedPermissions } from "./seed/permissions";
import { seedServiceCategories } from "./seed/serviceCategories";
import { seedAdmin } from "./seed/admin";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting HambakTech database seed...");

  await seedCompany(prisma);
  await seedWebsite(prisma);
  await seedRoles(prisma);
  await seedPermissions(prisma);
  await seedServiceCategories(prisma);
  await seedAdmin(prisma);

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });