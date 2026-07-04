
import type { AmenityFormValues } from "../schemas/amenity.zod";
import { PaginationLinks, PaginationMeta } from "./pagination.definations";

export interface AmenityFilters {
  search: string;
}
export interface Amenity {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  version?: number;
}

// ---- Form values ----
export type { AmenityFormValues };

export interface AmenitiesResponse {
  data: Amenity[];
  links: PaginationLinks;
  meta: PaginationMeta;
}