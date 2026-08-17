"use client";

import { createUser } from "@/actions/users/create-user";

interface Role {
  id: string;
  name: string;
}

interface UserFormProps {
  roles: Role[];
}

export default function UserForm({
  roles,
}: UserFormProps) {
  return (
    <form
      action={createUser}
      className="space-y-6 rounded-lg border bg-white p-6 shadow"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            First Name
          </label>

          <input
            name="firstName"
            required
            className="w-full rounded border p-3"
            placeholder="John"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Last Name
          </label>

          <input
            name="lastName"
            required
            className="w-full rounded border p-3"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Other Name
          </label>

          <input
            name="otherName"
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            name="email"
            type="email"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            name="phone"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Role
          </label>

          <select
            name="roleId"
            required
            className="w-full rounded border p-3"
          >
            <option value="">
              Select a role
            </option>

            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
              >
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Gender
          </label>

          <select
            name="gender"
            className="w-full rounded border p-3"
          >
            <option value="">
              Select gender
            </option>

            <option value="MALE">
              Male
            </option>

            <option value="FEMALE">
              Female
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded border p-3"
            placeholder="Minimum 8 characters"
          />
        </div>

      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Create User
      </button>
    </form>
  );
}