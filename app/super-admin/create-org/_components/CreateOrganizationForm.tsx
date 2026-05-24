"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Copy, Check } from "lucide-react";
import { createOrgSchema, type CreateOrgSchema } from "@/types/org";
import { createOrgAction } from "@/actions/org";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

type SuccessData = {
  orgName: string;
  orgSlug: string;
  inviteCode: string;
  adminEmail: string;
  adminPassword: string;
};

export function CreateOrganizationForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateOrgSchema>({
    resolver: zodResolver(createOrgSchema),
  });

  // auto generate slug from org name
  function handleOrgNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setValue("orgName", name);
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setValue("orgSlug", slug, { shouldValidate: true });
  }

  async function onSubmit(values: CreateOrgSchema) {
    setServerError(null);
    const result = await createOrgAction(values);
    if (!result.success) return setServerError(result.error);
    setSuccessData(result.data);
    reset();
  }

  async function copyToClipboard(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  // ── Success state ─────────────────────────────────
  if (successData) {
    return (
      <div className='space-y-4'>
        <div className='border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950 p-4'>
          <p className='text-sm font-medium text-green-800 dark:text-green-200 mb-1'>
            Organization created successfully
          </p>
          <p className='text-xs text-green-700 dark:text-green-300'>
            Share the invite code with users so they can join this organization.
            You can always find it in Manage Organizations.
          </p>
        </div>

        <div className='border bg-card p-4 space-y-3'>
          {[
            { label: "Organization", value: successData.orgName },
            { label: "Slug", value: successData.orgSlug },
            { label: "Invite Code", value: successData.inviteCode },
            { label: "Admin Email", value: successData.adminEmail },
            { label: "Admin Password", value: successData.adminPassword },
          ].map(({ label, value }) => (
            <div
              key={label}
              className='flex items-center justify-between gap-4'
            >
              <div>
                <p className='text-xs text-muted-foreground'>{label}</p>
                <p className='text-sm font-medium font-mono'>{value}</p>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => copyToClipboard(value, label)}
                className='shrink-0'
              >
                {copied === label ? (
                  <Check className='h-4 w-4 text-green-600' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant='outline'
          className='w-full'
          onClick={() => setSuccessData(null)}
        >
          Create another organization
        </Button>
      </div>
    );
  }

  // ── Form state ────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {serverError && (
        <div className='flex items-center gap-2 border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive'>
          <AlertCircle className='h-4 w-4 shrink-0' />
          {serverError}
        </div>
      )}

      {/* Organization details */}
      <Field>
        <FieldLabel htmlFor='orgName'>Organization name</FieldLabel>
        <Input
          id='orgName'
          placeholder='Organization Inc.'
          {...register("orgName")}
          onChange={handleOrgNameChange}
        />
        <FieldError>{errors.orgName?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor='orgSlug'>Slug</FieldLabel>
        <Input
          id='orgSlug'
          placeholder='org-corp'
          className='font-mono'
          {...register("orgSlug")}
        />
        <FieldDescription>
          Auto-generated from name. Used in URLs. You can edit it.
        </FieldDescription>
        <FieldError>{errors.orgSlug?.message}</FieldError>
      </Field>

      <Separator />

      {/* Admin details */}
      <p className='text-sm font-medium'>Admin account</p>

      <Field>
        <FieldLabel htmlFor='adminName'>Admin name</FieldLabel>
        <Input
          id='adminName'
          placeholder='John Doe'
          {...register("adminName")}
        />
        <FieldError>{errors.adminName?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor='adminEmail'>Admin email</FieldLabel>
        <Input
          id='adminEmail'
          placeholder='john@gmail.com'
          {...register("adminEmail")}
        />
        <FieldError>{errors.adminEmail?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor='adminPassword'>Admin password</FieldLabel>
        <Input
          id='adminPassword'
          type='password'
          placeholder='Min. 8 characters'
          {...register("adminPassword")}
        />
        <FieldDescription>
          Share this with the admin out of band (WhatsApp, Teams, etc.)
        </FieldDescription>
        <FieldError>{errors.adminPassword?.message}</FieldError>
      </Field>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? <Spinner className='mr-2' /> : null}
        {isSubmitting ? "Creating..." : "Create organization"}
      </Button>
    </form>
  );
}
