import { requireSuperAdmin } from "@/actions/user";

export default async function SuperAdminDashboardPage() {
  const session = await requireSuperAdmin();
  return <div className=''>Welcome lala {JSON.stringify(session.user)}</div>;
}
