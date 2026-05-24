"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";
import { deleteOrgAction } from "@/actions/org";
import { toast } from "sonner";

interface DeleteOrgDialogProps {
  orgId: string;
  orgName: string;
  onDeleted: () => void;
  orgSlug: string;
}

export function DeleteOrgDialog({
  orgId,
  orgName,
  orgSlug,
  onDeleted,
}: DeleteOrgDialogProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deleteOrgAction(orgId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(`${orgName} deleted successfully`);
    setOpen(false);
    onDeleted();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 text-muted-foreground hover:text-destructive'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {orgName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className='font-medium text-foreground'>
              {orgName} ({orgSlug})
            </span>{" "}
            along with its admin account and all member accounts. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {loading ? <Spinner className='mr-2' /> : null}
            {loading ? "Deleting..." : "Delete organization"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
