export default function UserFilters() {
  return (
    <div className="flex flex-wrap gap-3">

      <select className="rounded-lg border px-4 py-2">
        <option>All Roles</option>
        <option>SUPER_ADMIN</option>
        <option>ADMIN</option>
        <option>STAFF</option>
        <option>CUSTOMER</option>
        <option>STUDENT</option>
      </select>

      <select className="rounded-lg border px-4 py-2">
        <option>All Status</option>
        <option>ACTIVE</option>
        <option>PENDING</option>
        <option>SUSPENDED</option>
      </select>

    </div>
  );
}