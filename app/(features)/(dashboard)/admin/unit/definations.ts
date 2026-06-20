export type Images = {
  id:string;
  url: string;
  path: string;
  original_url?: string;
  watermarked_url?: string;
  thumbnail_url?: string;
  webp_url?: string;
};

export interface UnitProperty {
  id: string;
  propertyID: string;
  unitNumber: string;
  unitFloor: string;
  status: string;
  size: number;
  parking: number;
  bedrooms: number;
  bathrooms: number;
  rentAmount: string;
  images?: Images[];
  version?: number;
}

export interface UnitsResponse {
  data: UnitProperty[];
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
