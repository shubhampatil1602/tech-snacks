import { requireSuperAdmin } from "@/actions/user";
import { getAllOrganizations } from "@/modules/organization/queries";
import { OrgTable } from "./_components/OrgTable";

export default async function ManageOrgPage() {
  await requireSuperAdmin();
  const organizations = await getAllOrganizations();

  return (
    <div className='max-w-7xl px-4'>
      <div className='mb-6'>
        <h1 className='text-2xl font-heading tracking-wide'>
          Manage Organizations
        </h1>
        <p className='text-sm text-muted-foreground mt-1'>
          {organizations.length} organization
          {organizations.length !== 1 ? "s" : ""} registered
        </p>
      </div>
      <OrgTable data={organizations} />
    </div>
  );
}
