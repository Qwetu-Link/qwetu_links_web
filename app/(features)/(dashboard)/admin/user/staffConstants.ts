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
