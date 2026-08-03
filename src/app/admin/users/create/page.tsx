import UserForm from "@/components/users/UserForm";
import { getRoles } from "@/services/roles.service";

export default async function CreateUserPage() {
  const roles = await getRoles();

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

      <UserForm roles={roles} />
    </div>
  );
}