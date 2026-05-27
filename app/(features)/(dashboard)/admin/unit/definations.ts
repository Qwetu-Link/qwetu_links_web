export interface UnitPropertyImage {
  image_url: string;
}

export interface UnitProperty {
  id: string;
  name: string;
  location: string;
  units: number;
  occupancyRate: number;
  images: UnitPropertyImage[];
}
