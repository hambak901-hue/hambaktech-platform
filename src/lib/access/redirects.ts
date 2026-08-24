import { RoleType } from "@prisma/client";

export function getPostLoginPath(
  role: RoleType,
): string {
  switch (role) {
    case RoleType.SUPER_ADMIN:
    case RoleType.ADMIN:
      return "/admin/dashboard";

    case RoleType.STAFF:
    case RoleType.STUDENT:
    case RoleType.CUSTOMER:
      return "/portal/dashboard";

    default:
      return "/login";
  }
}