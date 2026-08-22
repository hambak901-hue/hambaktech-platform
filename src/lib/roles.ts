import { RoleType } from "@prisma/client";

export const roleLabels: Record<RoleType, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  STAFF: "Staff",
  STUDENT: "Student",
  CUSTOMER: "Customer",
};

export function getRoleLabel(role: RoleType) {
  return roleLabels[role];
}
