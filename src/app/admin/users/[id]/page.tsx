import { RoleType } from "@prisma/client";
import { notFound } from "next/navigation";

import CreateWalletForm from "@/components/wallet/CreateWalletForm";
import UserActivityCard from "@/components/users/UserActivityCard";
import UserProfileCard from "@/components/users/UserProfileCard";
import { getUserDetails } from "@/services/user-details.service";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const user = await getUserDetails(id);

  if (!user) {
    notFound();
  }

  const canCreateWallet =
    user.status === "ACTIVE" &&
    user.role?.type !== RoleType.SUPER_ADMIN &&
    !user.wallet;

  const userName = [
    user.firstName,
    user.otherName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          User Details
        </h1>

        <p className="mt-1 text-gray-500">
          View complete information about this user.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <UserProfileCard user={user} />

          {canCreateWallet && (
            <CreateWalletForm
              userId={user.id}
              userName={userName}
            />
          )}
        </div>

        <div>
          <UserActivityCard user={user} />
        </div>
      </div>
    </div>
  );
}
