import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { RecentOrganization } from "@/types/org";

interface RecentOrgsTableProps {
  data: RecentOrganization[];
}

export function RecentOrgsTable({ data }: RecentOrgsTableProps) {
  if (data.length === 0) {
    return (
      <div className='border border-dashed p-10 text-center'>
        <p className='text-sm text-muted-foreground'>
          No organizations yet.{" "}
          <Link
            href='/super-admin/create-org'
            className='text-foreground underline underline-offset-2'
          >
            Create one
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className='border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className='w-[50px]' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((org) => {
            const owner = org.members[0]?.user;
            return (
              <TableRow key={org.id}>
                <TableCell>
                  <div>
                    <p className='font-medium'>{org.name}</p>
                    <p className='text-xs text-muted-foreground font-mono'>
                      {org.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {owner ? (
                    <div>
                      <p className='text-sm'>{owner.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {owner.email}
                      </p>
                    </div>
                  ) : (
                    <span className='text-xs text-muted-foreground'>—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{org._count.members}</Badge>
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {new Date(org.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    asChild
                  >
                    <Link
                      href={`/super-admin/manage-org/${org.id}?name=${encodeURIComponent(org.slug)}`}
                    >
                      <ArrowRight className='h-4 w-4' />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className='border-t px-4 py-3'>
        <Link
          href='/super-admin/manage-org'
          className='text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1'
        >
          View all organizations
          <ArrowRight className='h-3.5 w-3.5' />
        </Link>
      </div>
    </div>
  );
}
