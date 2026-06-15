import { PropertyFormValues } from "@/app/lib/property.zod";
import { Amenity } from "../amenities/definations";
import { Business } from "../../qwetulinks/accounts/definations";

export type PropertyStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "maintenance";

export const propertyStatusValues = [
  "available",
  "occupied",
  "reserved",
  "maintenance",
] as const;

export interface PropertyFilters {
  search: string;
  status: "all" | PropertyStatus;
}

export type Property = {
  id: string;
  name: string;
  slug: string;
  address: string;
  location: string;
  apartmentType: string;
  description: string;
  parking: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  unit: string;
  status: PropertyStatus;
  occupanyRate: number;
  businessId: string;
  images: Images[];
  business: Business;
  version: number;
  amenities: Amenity[];
};

type Images = {
  url: string;
  path: string;
};

export interface PropertyImages extends Images {
  id: string;
  property_id: string;
  units_id: string;
  version: number | null;
}

export type PropertiesFormValues = {
  name: string;
  address: string;
  location: string;
  apartmentType: string;
  description: string;
  parking: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  status: PropertyStatus;
  image: Images[];
  amenityID: Amenity[];
};

export const emptyProperty: PropertyFormValues = {
  name: "",
  address: "",
  location: "",
  apartmentType: "apartment",
  description: "",
  parking: 0,
  bedrooms: 0,
  bathrooms: 0,
  squareMeters: 0,
  status: "available",
  image: [],
  amenityID: [],
};

export interface PropertyResponse {
  data: Property[];
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

export interface PropertyData {
  id: string;
  name: string;
  slug: string;
  address: string;
  location: string;
  apartmentType: string;
  description: string;
  parking: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  unit: string;
  status: PropertyStatus;
  occupanyRate: number;
  businessId: string;
  images: PropertyImages[];
  business: Business;
  version: number;
  amenities: Amenity[];
}

export interface PublicProperty {
  data: PropertyData;
}
export const fieldClass =
  "h-10 w-full rounded-lg border border-orange-100 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const textAreaClass =
  "min-h-28 w-full resize-y rounded-lg border border-orange-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export const propertyFields = [
  ["name", "Property name"],
  ["location", "Location"],
] as const;

export const numericFields = [
  ["parking", "Parking"],
  ["bedrooms", "Bedrooms"],
  ["bathrooms", "Bathrooms"],
  ["squareMeters", "Square meters"],
] as const;
