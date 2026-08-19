import {
  Prisma,
  PrismaClient,
  WalletStatus,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@prisma/client";

const prisma = new PrismaClient();

const TRANSACTION_RETRIES = 3;

export interface GetWalletsOptions {
  search?: string;
  status?: WalletStatus;
  page?: number;
  limit?: number;
}

export interface WalletMutationInput {
  walletId: string;
  amount: string;
  description?: string;
  metadata?: Prisma.InputJsonValue;
}

function validateAmount(amount: string): Prisma.Decimal {
  const value = new Prisma.Decimal(amount);

  if (!value.isFinite() || value.lte(0)) {
    throw new Error("Amount must be greater than zero.");
  }

  if (value.decimalPlaces() > 2) {
    throw new Error(
      "Amount cannot have more than two decimal places.",
    );
  }

  return value;
}

function createReference(prefix: string) {
  return `${prefix}-${Date.now()}-${crypto
    .randomUUID()
    .replace(/-/g, "")
    .slice(0, 12)
    .toUpperCase()}`;
}

async function runSerializableTransaction<T>(
  callback: (
    tx: Prisma.TransactionClient,
  ) => Promise<T>,
): Promise<T> {
  for (
    let attempt = 1;
    attempt <= TRANSACTION_RETRIES;
    attempt++
  ) {
    try {
      return await prisma.$transaction(
        callback,
        {
          isolationLevel:
            Prisma.TransactionIsolationLevel.Serializable,
          maxWait: 5000,
          timeout: 10000,
        },
      );
    } catch (error) {
      const isConflict =
        error instanceof
          Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034";

      if (
        !isConflict ||
        attempt === TRANSACTION_RETRIES
      ) {
        throw error;
      }
    }
  }

  throw new Error(
    "Transaction failed after multiple attempts.",
  );
}

export async function getWallets({
  search,
  status,
  page = 1,
  limit = 10,
}: GetWalletsOptions = {}) {
  const safePage = Math.max(page, 1);

  const safeLimit = Math.min(
    Math.max(limit, 1),
    100,
  );

  const where: Prisma.WalletWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (search?.trim()) {
    const query = search.trim();

    where.user = {
      OR: [
        {
          firstName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  const [wallets, total] = await Promise.all([
    prisma.wallet.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            otherName: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    }),

    prisma.wallet.count({
      where,
    }),
  ]);

  return {
    wallets,
    total,
    currentPage: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(
      total / safeLimit,
    ),
  };
}

export async function getWallet(id: string) {
  return prisma.wallet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          otherName: true,
          email: true,
          phone: true,
          status: true,
        },
      },
    },
  });
}

export async function getWalletDetails(
  id: string,
) {
  return prisma.wallet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          otherName: true,
          email: true,
          phone: true,
          status: true,
        },
      },
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      },
    },
  });
}

export async function getWalletTransactions(
  walletId: string,
  page = 1,
  limit = 20,
) {
  const safePage = Math.max(page, 1);

  const safeLimit = Math.min(
    Math.max(limit, 1),
    100,
  );

  const where = {
    walletId,
  };

  const [transactions, total] =
    await Promise.all([
      prisma.walletTransaction.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),

      prisma.walletTransaction.count({
        where,
      }),
    ]);

  return {
    transactions,
    total,
    currentPage: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(
      total / safeLimit,
    ),
  };
}

export async function getWalletStatistics() {
  const [
    totalWallets,
    activeWallets,
    suspendedWallets,
    closedWallets,
    balances,
  ] = await Promise.all([
    prisma.wallet.count(),

    prisma.wallet.count({
      where: {
        status: WalletStatus.ACTIVE,
      },
    }),

    prisma.wallet.count({
      where: {
        status: WalletStatus.SUSPENDED,
      },
    }),

    prisma.wallet.count({
      where: {
        status: WalletStatus.CLOSED,
      },
    }),

    prisma.wallet.aggregate({
      where: {
        status: WalletStatus.ACTIVE,
      },
      _sum: {
        balance: true,
      },
    }),
  ]);

  return {
    totalWallets,
    activeWallets,
    suspendedWallets,
    closedWallets,
    totalBalance:
      balances._sum.balance ??
      new Prisma.Decimal(0),
  };
}

export async function fundWallet(
  input: WalletMutationInput,
) {
  const amount = validateAmount(input.amount);

  return runSerializableTransaction(
    async (tx) => {
      const wallet =
        await tx.wallet.findUnique({
          where: {
            id: input.walletId,
          },
        });

      if (!wallet) {
        throw new Error("Wallet not found.");
      }

      if (
        wallet.status !==
        WalletStatus.ACTIVE
      ) {
        throw new Error(
          "Wallet is not active.",
        );
      }

      const reference =
        createReference("WAL-FUND");

      const transaction =
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            reference,
            amount,
            type:
              WalletTransactionType.CREDIT,
            status:
              WalletTransactionStatus.SUCCESS,
            provider: "WALLET",
            description:
              input.description ||
              "Wallet funded by administrator.",
            metadata: input.metadata,
            processedAt: new Date(),
          },
        });

      const updatedWallet =
        await tx.wallet.update({
          where: {
            id: wallet.id,
          },
          data: {
            balance: {
              increment: amount,
            },
          },
        });

      return {
        wallet: updatedWallet,
        transaction,
      };
    },
  );
}

export async function refundWallet(
  input: WalletMutationInput,
) {
  const amount = validateAmount(input.amount);

  return runSerializableTransaction(
    async (tx) => {
      const wallet =
        await tx.wallet.findUnique({
          where: {
            id: input.walletId,
          },
        });

      if (!wallet) {
        throw new Error("Wallet not found.");
      }

      if (
        wallet.status !==
        WalletStatus.ACTIVE
      ) {
        throw new Error(
          "Wallet is not active.",
        );
      }

      if (wallet.balance.lt(amount)) {
        throw new Error(
          "Insufficient wallet balance for refund.",
        );
      }

      const reference =
        createReference("WAL-REFUND");

      const transaction =
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            reference,
            amount,
            type:
              WalletTransactionType.DEBIT,
            status:
              WalletTransactionStatus.SUCCESS,
            provider: "WALLET",
            description:
              input.description ||
              "Wallet refund processed by administrator.",
            metadata: input.metadata,
            processedAt: new Date(),
          },
        });

      const updatedWallet =
        await tx.wallet.update({
          where: {
            id: wallet.id,
          },
          data: {
            balance: {
              decrement: amount,
            },
          },
        });

      return {
        wallet: updatedWallet,
        transaction,
      };
    },
  );
}

export async function debitWallet(
  input: WalletMutationInput,
) {
  const amount = validateAmount(input.amount);

  return runSerializableTransaction(
    async (tx) => {
      const wallet =
        await tx.wallet.findUnique({
          where: {
            id: input.walletId,
          },
        });

      if (!wallet) {
        throw new Error("Wallet not found.");
      }

      if (
        wallet.status !==
        WalletStatus.ACTIVE
      ) {
        throw new Error(
          "Wallet is not active.",
        );
      }

      if (wallet.balance.lt(amount)) {
        throw new Error(
          "Insufficient wallet balance.",
        );
      }

      const reference =
        createReference("WAL-DEBIT");

      const transaction =
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            reference,
            amount,
            type:
              WalletTransactionType.DEBIT,
            status:
              WalletTransactionStatus.SUCCESS,
            provider: "WALLET",
            description:
              input.description ||
              "Wallet debit processed.",
            metadata: input.metadata,
            processedAt: new Date(),
          },
        });

      const updatedWallet =
        await tx.wallet.update({
          where: {
            id: wallet.id,
          },
          data: {
            balance: {
              decrement: amount,
            },
          },
        });

      return {
        wallet: updatedWallet,
        transaction,
      };
    },
  );
}
