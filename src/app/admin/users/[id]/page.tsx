import { notFound } from "next/navigation";

import { getUserDetails } from "@/services/user-details.service";

import UserProfileCard from "@/components/users/UserProfileCard";
import UserActivityCard from "@/components/users/UserActivityCard";

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

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          User Details
        </h1>

        <p className="text-gray-500">
          View complete information about this user.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <UserProfileCard user={user} />

        </div>

        <div>

          <UserActivityCard user={user} />

        </div>

      </div>

    </div>
  );
}