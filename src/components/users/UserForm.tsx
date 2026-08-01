"use client";

export default function UserForm() {
  return (
    <form className="space-y-6 rounded-lg border bg-white p-6 shadow">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            First Name
          </label>

          <input
            className="w-full rounded border p-3"
            placeholder="John"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Last Name
          </label>

          <input
            className="w-full rounded border p-3"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Other Name
          </label>

          <input
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Gender
          </label>

          <select className="w-full rounded border p-3">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full rounded border p-3"
          />
        </div>

      </div>

      <button
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        Create User
      </button>

    </form>
  );
}