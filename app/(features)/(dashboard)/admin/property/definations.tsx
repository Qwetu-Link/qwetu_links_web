import { PropertyFormValues } from "@/app/lib/property.zod";

export type PropertyStatus = "Occupied" | "Unoccupied" | "Maintenance";

export const propertyStatusValues = [
  "Occupied",
  "Unoccupied",
  "Maintenance",
] as const;

export interface PropertyFilters {
  search: string;
  status: "all" | PropertyStatus;
}

export type Property = {
  name: string;
  slug: string;
  address: string;
  location: string;
  apartment_type: string;
  description: string;
  parking: number;
  bedrooms: number;
  bathrooms: number;
  square_meters: number;
  unit: string;
  status: PropertyStatus;
  occupany_rate: number;
  business_id: string;
  image: string;
};

export const emptyProperty: PropertyFormValues = {
  name: "",
  slug: "",
  address: "",
  location: "",
  apartment_type: "Apartment",
  description: "",
  parking: 0,
  bedrooms: 0,
  bathrooms: 0,
  square_meters: 0,
  unit: "",
  status: "Unoccupied",
  occupany_rate: 0,
  business_id: "",
  image: "",
};

export const seededProperties: Property[] = [
  {
    name: "Ocean Breeze Apartments",
    slug: "ocean-breeze-apartments",
    address: "Links Road, Nyali",
    location: "Mombasa, Kenya",
    apartment_type: "Apartment",
    description:
      "Modern residential apartments with spacious units, secure parking, backup water supply, and proximity to shopping centers and the beach.",
    parking: 50,
    bedrooms: 3,
    bathrooms: 2,
    square_meters: 120,
    unit: "10",
    status: "Occupied",
    occupany_rate: 90,
    business_id: "business-001",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  },

  {
    name: "Palm Residency Villas",
    slug: "palm-residency-villas",
    address: "Shanzu Beach Road",
    location: "Mombasa, Kenya",
    apartment_type: "Villa",
    description:
      "Luxury villas with private gardens, swimming pools, and ocean views in a secure gated community.",
    parking: 4,
    bedrooms: 5,
    bathrooms: 4,
    square_meters: 320,
    unit: "4",
    status: "Unoccupied",
    occupany_rate: 0,
    business_id: "business-001",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
  },

  {
    name: "City View Studios",
    slug: "city-view-studios",
    address: "Moi Avenue",
    location: "Mombasa CBD, Kenya",
    apartment_type: "Studio",
    description:
      "Affordable studio apartments suitable for students and young professionals working in the city center.",
    parking: 10,
    bedrooms: 1,
    bathrooms: 1,
    square_meters: 40,
    unit: "5",
    status: "Maintenance",
    occupany_rate: 0,
    business_id: "business-001",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  },

  {
    name: "Nyali Business Centre",
    slug: "nyali-business-centre",
    address: "Nyali Centre Road",
    location: "Nyali, Mombasa",
    apartment_type: "Office",
    description:
      "Premium office spaces designed for startups, SMEs, and corporate organizations with ample parking and meeting rooms.",
    parking: 80,
    bedrooms: 0,
    bathrooms: 8,
    square_meters: 1200,
    unit: "20",
    status: "Occupied",
    occupany_rate: 95,
    business_id: "business-001",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },

  {
    name: "Mtwapa Commercial Plaza",
    slug: "mtwapa-commercial-plaza",
    address: "Mtwapa Main Road",
    location: "Mtwapa, Kilifi",
    apartment_type: "Shop",
    description:
      "Retail spaces strategically located along a busy commercial street with high customer traffic.",
    parking: 30,
    bedrooms: 0,
    bathrooms: 4,
    square_meters: 500,
    unit: "50",
    status: "Unoccupied",
    occupany_rate: 20,
    business_id: "business-001",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },

  {
    name: "Coastal Retreat Resort",
    slug: "coastal-retreat-resort",
    address: "Diani Beach Road",
    location: "Diani, Kenya",
    apartment_type: "Resort",
    description:
      "Beachfront resort offering luxury accommodation, conference facilities, restaurants, and recreational activities.",
    parking: 100,
    bedrooms: 40,
    bathrooms: 40,
    square_meters: 5000,
    unit: "9",
    status: "Occupied",
    occupany_rate: 78,
    business_id: "business-001",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
];
