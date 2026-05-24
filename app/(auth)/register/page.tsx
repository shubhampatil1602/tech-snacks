import { RegisterForm } from "./_components/RegisterForm";
import { authIsNotRequired } from "@/actions/user";

export default async function RegisterPage() {
  await authIsNotRequired();
  return <RegisterForm />;
}
