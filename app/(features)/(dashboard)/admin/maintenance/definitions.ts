export type MaintenancePriority = "low" | "medium" | "high" | "urgent";

export type MaintenanceStatus =
  | "reported"
  | "in_progress"
  | "resolved"
  | "closed";

export type MaintenanceRequest = {
  id: string;
  unit_id: string;
  tenant_id: string;
  title: string;
  issue: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  reported_date: string;
  resolved_date: string;
  cost: number;
  notes: string;
};

export type MaintenanceStatusFilter = "all" | MaintenanceStatus;
