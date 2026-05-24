import { z } from "zod";
import { getAllOrganizations } from "@/modules/organization/queries";
import { getOrganizationById, getRecentOrganizations } from "@/actions/org";

export const createOrgSchema = z.object({
  orgName: z.string().min(2, "Organization name required"),
  orgSlug: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens only",
    ),
  adminName: z.string().min(2, "Admin name required"),
  adminEmail: z.email("Invalid admin email"),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type CreateOrgSchema = z.infer<typeof createOrgSchema>;

export type CreateOrgResult =
  | {
      success: true;
      data: {
        orgName: string;
        orgSlug: string;
        inviteCode: string;
        adminEmail: string;
        adminPassword: string;
      };
    }
  | { success: false; error: string };

export type OrganizationWithDetails = Awaited<
  ReturnType<typeof getAllOrganizations>
>[number];

export type OrganizationDetail = Awaited<
  ReturnType<typeof getOrganizationById>
>;

export type RecentOrganization = Awaited<
  ReturnType<typeof getRecentOrganizations>
>[number];
