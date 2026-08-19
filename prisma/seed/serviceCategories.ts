import { PrismaClient } from "@prisma/client";

export async function seedServiceCategories(
  prisma: PrismaClient,
) {
  const categories = [
    {
      name: "NIN Services",
      description:
        "National Identification Number registration and related services.",
    },
    {
      name: "ICT Training",
      description:
        "Information and communication technology training and courses.",
    },
    {
      name: "Digital Services",
      description:
        "Digital support, online services, and technology solutions.",
    },
    {
      name: "Online Registration",
      description:
        "Online application, registration, and documentation services.",
    },
  ];

  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: {
        name: category.name,
      },

      update: {
        description: category.description,
      },

      create: {
        name: category.name,
        description: category.description,
      },
    });
  }

  console.log("✅ Service Categories Seeded");
}
