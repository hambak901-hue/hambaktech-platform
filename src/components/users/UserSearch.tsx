interface UserSearchProps {
  value?: string;
}

export default function UserSearch({ value = "" }: UserSearchProps) {
  return (
    <input
      type="text"
      defaultValue={value}
      placeholder="Search by name, email or phone..."
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
    />
  );
}