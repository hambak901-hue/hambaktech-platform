export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

export function getPagination({
  page = 1,
  limit = 10,
}: PaginationOptions = {}): PaginationResult {
  const safePage = Number.isFinite(page)
    ? Math.max(Math.floor(page), 1)
    : 1;

  const safeLimit = Number.isFinite(limit)
    ? Math.min(Math.max(Math.floor(limit), 1), 100)
    : 10;

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
}

export function getTotalPages(
  total: number,
  limit: number,
): number {
  return Math.ceil(total / limit);
}
