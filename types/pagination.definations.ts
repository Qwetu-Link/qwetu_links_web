
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
