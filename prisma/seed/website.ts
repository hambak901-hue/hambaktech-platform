import { PrismaClient } from "@prisma/client";

export async function seedWebsite(prisma: PrismaClient) {
  await prisma.websiteSettings.upsert({
    where: {
      id: "hambak-website",
    },
    update: {},
    create: {
      id: "hambak-website",

      homepageTitle: "HambakTech Smart Digital Platform",

      homepageSubtitle:
        "Your trusted partner for NIN, ICT Training, Digital Services and Online Solutions.",

      homepageBanner: "/images/hero/hero.jpg",

      seoTitle: "HambakTech | Where Technology Meets Services",

      seoDescription:
        "Official HambakTech Smart Digital Platform for ICT training, NIN services, online registrations and digital solutions.",

      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      youtubeUrl: "",

      isMaintenanceMode: false,
    },
  });

  console.log("✅ Website Settings Seeded");
}