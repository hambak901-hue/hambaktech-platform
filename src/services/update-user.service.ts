import {
  PrismaClient,
  UserStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserForEdit(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    firstName: string;
    lastName: string;
    otherName?: string;
    email: string;
    phone?: string;
    roleId: string;
    status: UserStatus;
  }
) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName,
      email: data.email,
      phone: data.phone,
      roleId: data.roleId,
      status: data.status,
    },
  });
}