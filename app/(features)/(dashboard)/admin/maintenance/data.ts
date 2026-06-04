import type { MaintenanceRequest } from "./definitions";

export const initialMaintenanceRequest: MaintenanceRequest = {
  id: "REQ-001",
  unit_id: "consequatur",
  tenant_id: "consequatur",
  title: "mqeopfuudtdsufvyvddqa",
  issue: "consequatur",
  priority: "low",
  status: "in_progress",
  reported_date: "2026-06-01T21:08:56",
  resolved_date: "2107-07-01",
  cost: 45,
  notes: "consequatur",
};

export const emptyMaintenanceRequest: MaintenanceRequest = {
  id: "",
  unit_id: "",
  tenant_id: "",
  title: "",
  issue: "",
  priority: "low",
  status: "reported",
  reported_date: "",
  resolved_date: "",
  cost: 0,
  notes: "",
};
