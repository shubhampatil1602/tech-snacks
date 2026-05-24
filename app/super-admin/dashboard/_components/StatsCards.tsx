import { Building2, Users } from "lucide-react";

interface StatsCardsProps {
  totalOrgs: number;
  totalUsers: number;
}

export function StatsCards({ totalOrgs, totalUsers }: StatsCardsProps) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='border bg-card p-5'>
        <div className='flex items-center gap-2 text-muted-foreground mb-3'>
          <Building2 className='h-4 w-4' />
          <span className='text-xs font-medium uppercase tracking-wide'>
            Total Organizations
          </span>
        </div>
        <p className='text-3xl font-semibold tracking-tight'>{totalOrgs}</p>
      </div>

      <div className='border bg-card p-5'>
        <div className='flex items-center gap-2 text-muted-foreground mb-3'>
          <Users className='h-4 w-4' />
          <span className='text-xs font-medium uppercase tracking-wide'>
            Total Users
          </span>
        </div>
        <p className='text-3xl font-semibold tracking-tight'>{totalUsers}</p>
      </div>
    </div>
  );
}
