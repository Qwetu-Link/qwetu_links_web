import { PropertyFormValues } from "@/schemas/property.zod";
import { Amenity } from "./amenity.definations";
import { Business } from "./business.definations";
import { UnitProperty } from "./unit.definations";
import { Utility } from "./utilities.definations";
import { PaginationLinks, PaginationMeta } from "./pagination.definations";
import { PropertyStatus } from "@/utils/selectConstants";


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
  rentAmount: string;
  depositAmount: string;
  version: number;
  amenities: Amenity[];
  units?: UnitProperty[];
  utility?: Utility[],
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
  links: PaginationLinks;
  meta: PaginationMeta;
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

