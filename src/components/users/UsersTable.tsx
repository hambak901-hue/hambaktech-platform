import UserStatusBadge from "./UserStatusBadge";

interface Props {
  users: any[];
}

export default function UsersTable({ users }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">
      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">Name</th>

            <th className="px-4 py-3 text-left">Email</th>

            <th className="px-4 py-3 text-left">Role</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-left">Created</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-t"
            >

              <td className="px-4 py-3">
                {user.firstName} {user.lastName}
              </td>

              <td className="px-4 py-3">
                {user.email}
              </td>

              <td className="px-4 py-3">
                {user.role.name}
              </td>

              <td className="px-4 py-3">
                <UserStatusBadge status={user.status} />
              </td>

              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}