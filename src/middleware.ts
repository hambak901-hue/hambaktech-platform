export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
    "/student/:path*",
    "/staff/:path*",
  ],
};