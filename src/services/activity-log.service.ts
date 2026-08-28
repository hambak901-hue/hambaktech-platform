import { Prisma } from "@prisma/client";

import {
  getPagination,
  getTotalPages,
} from "@/lib/pagination";
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

function buildActivityLogData(
  input: CreateActivityLogInput,
): Prisma.ActivityLogCreateInput {
  return {
    ...(input.userId
      ? {
          user: {
            connect: {
              id: input.userId,
            },
          },
        }
      : {}),
    action: input.action,
    entity: input.entity,
    entityId: input.entityId ?? null,
    description: input.description ?? null,
    metadata:
      input.metadata === null
        ? Prisma.JsonNull
        : input.metadata ?? undefined,
    ipAddress: input.ipAddress ?? null,
    userAgent: input.userAgent ?? null,
  };
}

/**
 * Create an activity log using the normal
 * application Prisma client.
 */
export async function createActivityLog(
  input: CreateActivityLogInput,
) {
  return prisma.activityLog.create({
    data: buildActivityLogData(input),
  });
}

/**
 * Create an activity log using an existing
 * Prisma transaction client.
 *
 * This allows the activity log to commit or
 * roll back together with the surrounding
 * database transaction.
 */
export async function createActivityLogInTransaction(
  tx: Prisma.TransactionClient,
  input: CreateActivityLogInput,
) {
  return tx.activityLog.create({
    data: buildActivityLogData(input),
  });
}

export async function getActivityLogs(
  options: GetActivityLogsOptions = {},
) {
  const pagination = getPagination({
    page: options.page ?? 1,
    limit: options.limit ?? 20,
  });

  const where: Prisma.ActivityLogWhereInput = {
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

  const [logs, total] =
    await Promise.all([
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
        skip: pagination.skip,
        take: pagination.limit,
      }),

      prisma.activityLog.count({
        where,
      }),
    ]);

  return {
    logs,
    total,
    page: pagination.page,
    limit: pagination.limit,
    totalPages: getTotalPages(
      total,
      pagination.limit,
    ),
  };
}

export async function getActivityLog(
  id: string,
) {
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

  startOfToday.setHours(
    0,
    0,
    0,
    0,
  );

  const [
    totalLogs,
    todayLogs,
  ] = await Promise.all([
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
