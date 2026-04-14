export interface Property {
  id: string;
  name: string;
  slug: string;
  location: string;
  address: string;
  apartment_type: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  square_meters: number;

  amenities: {
    id: string;
    name: string;
    icon: string;
  }[];

  images: {
    id: string;
    image_url: string;
    caption?: string;
  }[];

  highlights: {
    id: string;
    title?: string;
    image_url?: string;
  }[];

  units: {
    id: string;
    unit_number: string;
    status: string;
    rent_amount: number;
  }[];
}
