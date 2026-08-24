import { RoleType } from "@prisma/client";

export const ADMIN_ROLES: RoleType[] = [
  RoleType.SUPER_ADMIN,
  RoleType.ADMIN,
];

export const PORTAL_ROLES: RoleType[] = [
  RoleType.SUPER_ADMIN,
  RoleType.ADMIN,
  RoleType.STAFF,
  RoleType.STUDENT,
  RoleType.CUSTOMER,
];

export function isAdminRole(
  role: RoleType,
): boolean {
  return ADMIN_ROLES.includes(role);
}

export function isPortalRole(
  role: RoleType,
): boolean {
  return PORTAL_ROLES.includes(role);
}

export function isSuperAdmin(
  role: RoleType,
): boolean {
  return role === RoleType.SUPER_ADMIN;
}
