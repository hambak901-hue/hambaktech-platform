import { auth } from "@/auth";
import {
  isAdminRole,
  isPortalRole,
} from "@/lib/access/roles";
import { NextResponse } from "next/server";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const user = request.auth?.user;

  const isAdminRoute =
    pathname.startsWith("/admin");

  const isPortalRoute =
    pathname.startsWith("/portal");

  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    if (!isAdminRole(user.role)) {
      return NextResponse.redirect(
        new URL("/portal/dashboard", request.url),
      );
    }
  }

  if (isPortalRoute) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    if (!isPortalRole(user.role)) {
      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
  ],
};