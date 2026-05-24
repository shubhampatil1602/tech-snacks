import { requireSuperAdmin } from "@/actions/user";
import { getOrganizationById } from "@/actions/org";
import { notFound } from "next/navigation";
import { OrgDetail } from "./_components/OrgDetail";

interface Props {
  params: Promise<{ orgId: string }>;
}

export default async function OrgDetailPage({ params }: Props) {
  await requireSuperAdmin();

  const { orgId } = await params;
  const org = await getOrganizationById(orgId);

  if (!org) notFound();

  return (
    <div className='max-w-7xl px-4'>
      <OrgDetail org={org} />
    </div>
  );
}
