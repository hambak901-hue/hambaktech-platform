import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface CreateActivityLogInput {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  description?: string | null;
  metadata?: Prisma.InputJsonValue | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface GetActivityLogsOptions {
  userId?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  page?: number;
  limit?: number;
}

export async function createActivityLog(
  input: CreateActivityLogInput,
) {
  return prisma.activityLog.create({
    data: {
      userId: input.userId ?? null,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      description: input.description ?? null,
      metadata: input.metadata ?? undefined,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    },
  });
}

export async function getActivityLogs(
  options: GetActivityLogsOptions = {},
) {
  const page = Math.max(options.page ?? 1, 1);
  const limit = Math.min(
    Math.max(options.limit ?? 20, 1),
    100,
  );

  const where = {
    ...(options.userId
      ? {
          userId: options.userId,
        }
      : {}),

    ...(options.action
      ? {
          action: options.action,
        }
      : {}),

    ...(options.entity
      ? {
          entity: options.entity,
        }
      : {}),

    ...(options.entityId
      ? {
          entityId: options.entityId,
        }
      : {}),
  };

  const [logs, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.activityLog.count({
      where,
    }),
  ]);

  return {
    logs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getActivityLog(id: string) {
  return prisma.activityLog.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
}

export async function getActivityLogStatistics() {
  const startOfToday = new Date();

  startOfToday.setHours(0, 0, 0, 0);

  const [totalLogs, todayLogs] = await Promise.all([
    prisma.activityLog.count(),

    prisma.activityLog.count({
      where: {
        createdAt: {
          gte: startOfToday,
        },
      },
    }),
  ]);

  return {
    totalLogs,
    todayLogs,
  };
}
