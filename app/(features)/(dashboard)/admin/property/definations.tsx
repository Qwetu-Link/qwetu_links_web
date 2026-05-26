export type PropertyStatus = "Occupied" | "Unoccupied" | "Maintenance";

export interface Property {
  id: string;
  name: string;
  status: PropertyStatus;
  type: string;
  location: string;
  units: number;
  occupancyRate: number;
  image: string;
}

export interface PropertyFilters {
  search: string;
  status: "all" | PropertyStatus;
}
