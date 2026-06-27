// ─── Pagination Links ─────────────────────────────────────────────────────────

import z from "zod";

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