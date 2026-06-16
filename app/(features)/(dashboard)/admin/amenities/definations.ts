
import type { AmenityFormValues } from "./amenity.zod";
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
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    to: number;
    from: number;
  };
}