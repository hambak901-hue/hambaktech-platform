import UserActions from "./UserActions";
import UserStatusBadge from "./UserStatusBadge";

interface Props {
  users: any[];
}

export default function UsersTable({
  users,
}: Props) {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold">
          No users found
        </h2>

        <p className="mt-2 text-gray-500">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Name
            </th>

            <th className="px-4 py-3 text-left">
              Email
            </th>

            <th className="px-4 py-3 text-left">
              Role
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Created
            </th>

            <th className="px-4 py-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">
                {user.firstName} {user.lastName}
              </td>

              <td className="px-4 py-3">
                {user.email}
              </td>

              <td className="px-4 py-3">
                {user.role?.name ?? "-"}
              </td>

              <td className="px-4 py-3">
                <UserStatusBadge
                  status={user.status}
                />
              </td>

              <td className="px-4 py-3">
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <UserActions
                  userId={user.id}
                  status={user.status}
                />
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}