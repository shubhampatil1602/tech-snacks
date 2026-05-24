import { LoginForm } from "./_components/LoginForm";
import { authIsNotRequired } from "@/actions/user";

export default async function LoginPage() {
  await authIsNotRequired();
  return <LoginForm />;
}
