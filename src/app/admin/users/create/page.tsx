import UserForm from "@/components/users/UserForm";

export default function CreateUserPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Create User
        </h1>

        <p className="text-gray-500">
          Register a new HambakTech user.
        </p>
      </div>

      <UserForm />
    </div>
  );
}