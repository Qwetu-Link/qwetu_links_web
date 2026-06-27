
//STAFF
export const DEPARTMENTS = [
  { name: "Administration", code: "ADMIN" },
  { name: "Finance & Accounts", code: "FIN" },
  { name: "Property Management", code: "PROP" },
  { name: "Maintenance", code: "MAIN" },
  { name: "Customer Service", code: "CS" },
  { name: "Security", code: "SEC" },
  { name: "ICT", code: "ICT" },
] as const;

export const POSITIONS = [
  "Executive",
  "Manager",
  "Supervisor",
  "Officer",
  "Staff",
] as const;

export const employmentTypeValues = [
  "full_time",
  "part_time",
  "contract",
  "intern",
  "temporary",
] as const;

export const employmentTypeLabels: Record<EmploymentType, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  intern: "Intern",
  temporary: "Temporary",
};

export type Department = (typeof DEPARTMENTS)[number]["code"];
export type Position = (typeof POSITIONS)[number];
export type EmploymentType = (typeof employmentTypeValues)[number];


// Busines
export const businessRoleOptions = [
  {
    value: "company_admin",
    label: "Company Admin",
  },
  {
    value: "property_manager",
    label: "Property Manager",
  },
  {
    value: "landlord",
    label: "Landlord",
  },
] as const;

// PROPERTY
export const propertyTypeGroups = [
  {
    label: "Residential",
    options: ["Apartment", "House", "Villa", "Bedsitter", "Studio"],
  },
  {
    label: "Commercial",
    options: ["Office", "Shop", "Warehouse", "Retail Space"],
  },
  {
    label: "Land",
    options: ["Residential Plot", "Commercial Plot", "Agricultural Land"],
  },
  {
    label: "Hospitality",
    options: ["Hotel", "Resort", "Airbnb"],
  },
] as const;

// UNITS
export const unitStatusValues = [
    "available",
    "occupied",
    "reserved",
    "maintenance"
] as const;


//PROPERTY
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
