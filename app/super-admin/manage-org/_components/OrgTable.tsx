"use client";

import { useState } from "react";
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
import { Copy, Check } from "lucide-react";
import { DeleteOrgDialog } from "./DeleteOrgDialog";
import type { OrganizationWithDetails } from "@/types/org";
import Link from "next/link";

interface OrgTableProps {
  data: OrganizationWithDetails[];
}

export function OrgTable({ data }: OrgTableProps) {
  const [orgs, setOrgs] = useState(data);
  const [copied, setCopied] = useState<string | null>(null);

  async function copyToClipboard(value: string, id: string) {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function handleDeleted(orgId: string) {
    setOrgs((prev) => prev.filter((o) => o.id !== orgId));
  }

  if (orgs.length === 0) {
    return (
      <div className='border border-dashed p-12 text-center'>
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
            <TableHead>Slug</TableHead>
            <TableHead>Invite Code</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className='w-[80px]' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orgs.map((org) => {
            const owner = org.members[0]?.user;
            return (
              <TableRow
                key={org.id}
                className='cursor-pointer hover:bg-muted/50'
              >
                <TableCell className='font-medium'>
                  <Link
                    href={`/super-admin/manage-org/${org.id}?name=${encodeURIComponent(org.slug)}`}
                    className='block hover:underline font-medium'
                  >
                    {org.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/super-admin/manage-org/${org.id}?name=${encodeURIComponent(org.slug)}`}
                    className='block'
                  >
                    <span className='font-mono text-xs text-muted-foreground'>
                      {org.slug}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <span className='font-mono text-xs tracking-widest'>
                      {org.inviteCode}
                    </span>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6'
                      onClick={() => copyToClipboard(org.inviteCode, org.id)}
                    >
                      {copied === org.id ? (
                        <Check className='h-3 w-3 text-green-600' />
                      ) : (
                        <Copy className='h-3 w-3' />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {owner ? (
                    <div>
                      <p className='text-sm font-medium'>{owner.name}</p>
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
                  <DeleteOrgDialog
                    orgId={org.id}
                    orgName={org.name}
                    orgSlug={org.slug}
                    onDeleted={() => handleDeleted(org.id)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
