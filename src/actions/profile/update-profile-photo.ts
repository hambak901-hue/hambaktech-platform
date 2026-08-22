"use server";

import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
} as const;

export async function updateProfilePhotoAction(
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const file = formData.get("profilePhoto");

  if (!(file instanceof File)) {
    throw new Error("Please select an image.");
  }

  if (file.size === 0) {
    throw new Error("The selected image is empty.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      "Profile photo must not exceed 5MB.",
    );
  }

  const extension =
    allowedTypes[file.type as keyof typeof allowedTypes];

  if (!extension) {
    throw new Error(
      "Only JPG, PNG, and WEBP images are allowed.",
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      profilePhoto: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "profile",
  );

  await mkdir(uploadDirectory, {
    recursive: true,
  });

  const filename = `${user.id}-${randomUUID()}${extension}`;

  const filepath = path.join(
    uploadDirectory,
    filename,
  );

  await writeFile(filepath, buffer);

  if (
    user.profilePhoto &&
    user.profilePhoto.startsWith(
      "/uploads/profile/",
    )
  ) {
    const oldFilename = path.basename(
      user.profilePhoto,
    );

    const oldFilepath = path.join(
      uploadDirectory,
      oldFilename,
    );

    try {
      await unlink(oldFilepath);
    } catch {
      // Old photo may already have been removed.
    }
  }

  const profilePhoto = `/uploads/profile/${filename}`;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      profilePhoto,
    },
  });

  revalidatePath("/admin/profile");
  revalidatePath("/admin/dashboard");
}