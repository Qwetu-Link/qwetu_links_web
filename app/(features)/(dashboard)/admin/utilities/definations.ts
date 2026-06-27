// ─── Utility ─────────────────────────────────────────────────────────────────
export type BillingPeriod = "monthly" | "quarterly" | "annual" | "one-time";

export interface Utility {
  id: string;
  propertyID: string;
  utilityName: string;
  utilityAmount: number;
  utilityDeposit: number;
  billingPeriod: BillingPeriod;
  utilityDescription: string;
  version?: number;
}

// ─── Pagination Link ──────────────────────────────────────────────────────────

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

// ─── Meta Link ────────────────────────────────────────────────────────────────

export interface MetaLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

// ─── Paginated Response (generic) ────────────────────────────────────────────

export interface UtilityPaginatedResponse {
  data: Utility[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
// export interface UtilityPaginatedResponse<T> {
//   data: T[];
//   links: PaginationLinks;
//   meta: PaginationMeta;
// }

// ─── Utilities Response ───────────────────────────────────────────────────────

// export type UtilitiesResponse = UtilityPaginatedResponse<Utility>;