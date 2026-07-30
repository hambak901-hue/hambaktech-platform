import { PrismaClient } from "@prisma/client";

export async function seedServiceCategories(
  prisma: PrismaClient
) {
  const categories = [
    "NIN Services",
    "Training & Academy",
    "WAEC Services",
    "JAMB Services",
    "Passport Photos",
    "Printing & Photocopy",
    "ICT Services",
  ];

  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: {
        name: category,
      },
      update: {},
      create: {
        name: category,
      },
    });
  }

  console.log("✅ Service Categories Seeded");
}