import { PaginationLinks, PaginationMeta } from "./pagination.definations";

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