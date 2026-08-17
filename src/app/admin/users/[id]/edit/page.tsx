import { notFound } from "next/navigation";

import EditUserForm from "@/components/users/EditUserForm";
import { getUserForEdit } from "@/services/update-user.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({
  params,
}: Props) {
  const { id } = await params;

  const user = await getUserForEdit(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit User
        </h1>

        <p className="text-gray-500">
          Update user information.
        </p>

      </div>

      <EditUserForm user={user} />

    </div>
  );
}