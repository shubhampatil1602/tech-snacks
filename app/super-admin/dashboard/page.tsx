import { requireSuperAdmin } from "@/actions/user";
import { getOrgStats, getRecentOrganizations } from "@/actions/org";
import { StatsCards } from "./_components/StatsCards";
import { RecentOrgsTable } from "./_components/RecentOrgsTable";

export default async function SuperAdminDashboard() {
  const session = await requireSuperAdmin();
  const [stats, recentOrgs] = await Promise.all([
    getOrgStats(),
    getRecentOrganizations(),
  ]);

  return (
    <div className='space-y-8 px-4'>
      <div>
        <h1 className='text-2xl font-heading tracking-wide'>
          Welcome back, {session.user.name}
        </h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Here&apos;s what&apos;s happening across your organizations.
        </p>
      </div>

      <StatsCards totalOrgs={stats.totalOrgs} totalUsers={stats.totalUsers} />

      <div>
        <h2 className='text-sm font-medium mb-3'>Recent Organizations</h2>
        <RecentOrgsTable data={recentOrgs} />
      </div>
    </div>
  );
}
