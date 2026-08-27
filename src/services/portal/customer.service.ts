import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function requireCustomer() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User account not found.");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("User account is not active.");
  }

  return user;
}

export async function getCustomerWallet(
  customerId: string,
) {
  return prisma.wallet.findUnique({
    where: {
      userId: customerId,
    },
  });
}

export async function requireCustomerWallet() {
  const customer = await requireCustomer();

  const wallet = await getCustomerWallet(
    customer.id,
  );

  if (!wallet) {
    return {
      customer,
      wallet: null,
    };
  }

  return {
    customer,
    wallet,
  };
}