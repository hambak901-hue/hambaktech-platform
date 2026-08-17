"use client";

import { updateUserAction } from "@/actions/users/edit/update-user";

type EditUserFormProps = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    otherName: string | null;
    email: string;
    phone: string | null;
    roleId: string;
    status: string;
  };
};

export default function EditUserForm({
  user,
}: EditUserFormProps) {
  return (
    <form
      action={updateUserAction}
      className="space-y-6 rounded-lg border bg-white p-6 shadow"
    >
      <input type="hidden" name="id" defaultValue={user.id} />

      <div>
        <label className="block text-sm font-medium">
          First Name
        </label>

        <input
          name="firstName"
          defaultValue={user.firstName}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Last Name
        </label>

        <input
          name="lastName"
          defaultValue={user.lastName}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Other Name
        </label>

        <input
          name="otherName"
          defaultValue={user.otherName ?? ""}
          className="mt-1 w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          defaultValue={user.email}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Phone
        </label>

        <input
          name="phone"
          defaultValue={user.phone ?? ""}
          className="mt-1 w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Role ID
        </label>

        <input
          name="roleId"
          defaultValue={user.roleId}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          defaultValue={user.status}
          className="mt-1 w-full rounded border p-2"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="PENDING">PENDING</option>
          <option value="SUSPENDED">SUSPENDED</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Update User
      </button>
    </form>
  );
}