import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

      if (isAdminPage) {
        return isLoggedIn;
      }

      return true;
    },
  },

  providers: [],
};