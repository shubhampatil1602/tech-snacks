import { requireSuperAdmin } from "@/actions/user";
import { CreateOrganizationForm } from "./_components/CreateOrganizationForm";

export default async function CreateOrganization() {
  await requireSuperAdmin();
  return (
    <div className='max-w-7xl px-4'>
      <div className='mb-8'>
        <h1 className='text-2xl font-heading tracking-wide'>
          Create Organization
        </h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Set up a new organization and its admin account. Share the credentials
          and invite code with the admin manually.
        </p>
      </div>
      <CreateOrganizationForm />
    </div>
  );
}
