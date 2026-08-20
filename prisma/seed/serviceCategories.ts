import { PrismaClient } from "@prisma/client";

export async function seedServiceCategories(
  prisma: PrismaClient,
) {
  const categories = [
    {
      name: "NIN Services",
      description:
        "National Identification Number and related identity services.",
    },
    {
      name: "ICT Training",
      description:
        "Computer, technology, and digital skills training.",
    },
    {
      name: "Digital Services",
      description:
        "Professional digital and technology services.",
    },
    {
      name: "Online Solutions",
      description:
        "Online registrations, applications, and other digital solutions.",
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
      create: category,
    });
  }

  console.log("✅ Service Categories Seeded");
}