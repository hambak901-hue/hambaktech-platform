import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getPostLoginPath } from "@/lib/access/redirects";

export default async function AuthRedirectPage() {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/login");
  }

  redirect(getPostLoginPath(session.user.role));
}