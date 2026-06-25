import { UnitProperty } from "../unit/definations";

export const maintenancePriorityValues = [
  "low",
  "medium",
  "high",
] as const;

export type MaintenancePriority =
  (typeof maintenancePriorityValues)[number];

export const maintenanceStatusValues = [
  "pending",
  "in_progress",
  "resolved",
] as const;

export type MaintenanceStatus =
  (typeof maintenanceStatusValues)[number];
export type MaintenanceStatusFilter = "all" | MaintenanceStatus;



// 1. The main key-value pair configuration map
export const MAINTENANCE_CATEGORIES = {
  plumbing: "Plumbing",
  electrical: "Electrical",
  hvac: "HVAC / Air Conditioning",
  painting: "Painting",
  carpentry: "Carpentry",
  roofing: "Roofing",
  flooring: "Flooring",
  appliance: "Appliance Repair",
  security: "Security",
  cleaning: "Cleaning",
  pest_control: "Pest Control",
  landscaping: "Landscaping",
  internet_cable: "Internet & Cable",
  water_supply: "Water Supply",
  waste_management: "Waste Management",
  general: "General Maintenance",
} as const;

// 2. Automatically derive the tuple keys for your Zod schema:
// ["plumbing", "electrical", "hvac", ...]
export const categoryKeys = Object.keys(MAINTENANCE_CATEGORIES) as [
  keyof typeof MAINTENANCE_CATEGORIES,
  ...(keyof typeof MAINTENANCE_CATEGORIES)[]
];

export type MaintenanceCategoryKey = keyof typeof MAINTENANCE_CATEGORIES;

export interface MaintenanceRequest {
  id: string;
  maintainanceNo: string; // Note: matches the backend spelling "maintainanceNo"
  businessID: string;
  unitID: string;
  category: MaintenanceCategoryKey;
  assignedTo: string | null; // Can be null if nobody is assigned yet
  tenantID: string;
  title: string;
  issue: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  reportedDate: string; // ISO Date string (e.g., "2026-06-20T...")
  resolvedDate: string | null; // Can be null if it's still open/pending
  cost: string; // Stored as a decimal string (e.g., "0.00")
  notes: string;
  version: number;
  unit: UnitProperty; // Nested unit details
}

export interface MaintenanceResponse {
  data: MaintenanceRequest[];
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