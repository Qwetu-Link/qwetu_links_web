import { z } from "zod";
import { PaginationLinksSchema, PaginationMetaSchema } from "./pagination.zod";

// ─── Utility ─────────────────────────────────────────────────────────────────

export const UtilitySchema = z.object({
  propertyID: z.string(),
  utilityName: z.string(),
  utilityAmount: z.number().nonnegative(),
  billingPeriod: z.string(),
  utilityDeposit: z.number().nonnegative(),
  utilityDescription: z.string(),
  version: z.number().int().nonnegative().optional(),
});

export type UtilityFormValues = z.infer<typeof UtilitySchema>;

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