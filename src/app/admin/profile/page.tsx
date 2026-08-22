import Image from "next/image";

import { updateProfilePhotoAction } from "@/actions/profile/update-profile-photo";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { getRoleLabel } from "@/lib/roles";
import { getCurrentUser } from "@/services/current-user.service";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-lg border bg-white p-8">
        <h1 className="text-xl font-semibold">
          Unable to load profile
        </h1>

        <p className="mt-2 text-gray-500">
          Your session could not be found.
        </p>
      </div>
    );
  }

  const fullName = [
    user.firstName,
    user.otherName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500">
          Manage your profile information and passport photo.
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt={`${fullName} profile`}
              width={120}
              height={120}
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
              {initials}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold">
              {fullName}
            </h2>

            <p className="text-gray-500">
              {getRoleLabel(user.role.type)}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">
          Profile Photo
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload a clear passport-style photograph.
          JPG, PNG, and WEBP files up to 5MB are supported.
        </p>

        <form
          action={updateProfilePhotoAction}
          className="mt-6 space-y-4"
        >
          <input
            type="file"
            name="profilePhoto"
            accept="image/jpeg,image/png,image/webp"
            required
            className="block w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Upload Profile Photo
          </button>
        </form>
      </div>

      <div className="grid gap-6 rounded-lg border bg-white p-6 shadow md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            First Name
          </p>

          <p className="font-medium">
            {user.firstName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Last Name
          </p>

          <p className="font-medium">
            {user.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Phone
          </p>

          <p className="font-medium">
            {user.phone ?? "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Role
          </p>

          <p className="font-medium">
            {getRoleLabel(user.role.type)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Account Status
          </p>

          <p className="font-medium">
            {user.status}
          </p>
        </div>
      </div>

      <ChangePasswordForm />
    </div>
  );
}