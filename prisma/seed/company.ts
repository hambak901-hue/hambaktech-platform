import { PrismaClient } from "@prisma/client";

export async function seedCompany(prisma: PrismaClient) {
  await prisma.companySettings.upsert({
    where: {
      id: "hambak-company",
    },
    update: {},
    create: {
      id: "hambak-company",
      companyName: "Hambak Tech & Services",
      brandName: "HambakTech",
      slogan: "Where Technology Meets Services",
      registrationNumber: "BN 9284726",

      email: "hambak901@gmail.com",
      alternateEmail: "oyemi19@gmail.com",

      phone: "08147837664",
      whatsapp: "09155104724",
      customerService: "09127469686",

      address: "Origanrigan Cele Area",
      city: "Ibeju-Lekki",
      state: "Lagos",
      country: "Nigeria",

      website: "https://hambaktech.com",

      isActive: true,
    },
  });

  console.log("✅ Company Settings Seeded");
}