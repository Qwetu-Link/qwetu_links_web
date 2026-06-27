import { z } from "zod";

// ─── Utility ─────────────────────────────────────────────────────────────────

export const UtilitySchema = z.object({
  propertyID: z.string(),
  utilityName: z.string(),
  utilityAmount: z.number().nonnegative(),
  billingPeriod:z.string(),
  utilityDeposit: z.number().nonnegative(),
  utilityDescription: z.string(),
  version: z.number().int().nonnegative().optional(),
});

export type UtilityFormValues = z.infer<typeof UtilitySchema>;

// ─── Pagination Links ─────────────────────────────────────────────────────────

export const PaginationLinksSchema = z.object({
  first: z.string().url().nullable(),
  last: z.string().url().nullable(),
  prev: z.string().url().nullable(),
  next: z.string().url().nullable(),
});

export type PaginationLinks = z.infer<typeof PaginationLinksSchema>;

// ─── Meta Link ────────────────────────────────────────────────────────────────

export const MetaLinkSchema = z.object({
  url: z.string().url().nullable(),
  label: z.string(),
  page: z.number().int().positive().nullable(),
  active: z.boolean(),
});

export type MetaLink = z.infer<typeof MetaLinkSchema>;

// ─── Pagination Meta ──────────────────────────────────────────────────────────

export const PaginationMetaSchema = z.object({
  current_page: z.number().int().positive(),
  from: z.number().int().positive().nullable(),
  last_page: z.number().int().positive(),
  links: z.array(MetaLinkSchema),
  path: z.string().url(),
  per_page: z.number().int().positive(),
  to: z.number().int().positive().nullable(),
  total: z.number().int().nonnegative(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

// ─── Paginated Response (generic factory) ────────────────────────────────────

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    links: PaginationLinksSchema,
    meta: PaginationMetaSchema,
  });

// ─── Utilities Response ───────────────────────────────────────────────────────

export const UtilitiesResponseSchema = PaginatedResponseSchema(UtilitySchema);

export type UtilitiesResponse = z.infer<typeof UtilitiesResponseSchema>;