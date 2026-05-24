import { requireSuperAdmin } from "@/actions/user";
import { getAllOrganizations } from "@/modules/organization/queries";

export default async function ManageOrganization() {
  await requireSuperAdmin();
  const organizations = await getAllOrganizations();

  return (
    <div className=''>
      Manage Organization
      {JSON.stringify(organizations)}
    </div>
  );
}
