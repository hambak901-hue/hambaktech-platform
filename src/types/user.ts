import type { UserStatus } from "@prisma/client";

export interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  createdAt: Date;
  role?: {
    name: string;
  } | null;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  otherName: string | null;
  email: string;
  phone: string | null;
  gender: string | null;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  role?: {
    name: string;
  } | null;
}

export interface UserActivity {
  orders?: unknown[];
  payments?: unknown[];
  serviceRequests?: unknown[];
  wallet?: {
    balance: unknown;
  } | null;
  student?: {
    enrollments?: unknown[];
  } | null;
}