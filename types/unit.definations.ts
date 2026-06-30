import { PaginationLinks, PaginationMeta } from "./pagination.definations";

export type UnitStatus = "available" | "occupied" | "maintenance" | "reserved";

export interface UnitProperty {
  id: string;
  unitNumber: string;
  unitFloor: string;
  status: UnitStatus;
  size: string; // Stored as a decimal string in DB (e.g., "50.00")
  sizeUnit: string; // e.g., "sqm" or "sqft"
  bedrooms: number;
  parking: number;
  bathrooms: number;
  rentAmount: string; // Stored as a decimal string (e.g., "0.00")
  depositAmount: string; // Stored as a decimal string (e.g., "0.00")
  propertyID: string;
  businessID: string;
  version?: number;
}


export interface UnitsResponse {
  data: UnitProperty[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
