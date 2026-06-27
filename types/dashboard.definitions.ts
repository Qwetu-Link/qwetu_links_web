export interface DashboardProperties {
  total: number;
  available: number;
  reserved: number;
  maintenance: number;
}

export interface DashboardUnits {
  total: number;
  available: number;
  occupied: number;
  vacant: number;
}

export interface DashboardTenants {
  total: number;
  active: number;
}

export interface DashboardStaff {
  total: number;
}

export interface DashboardFinance {
  paymentsReceived: number;
  pendingInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
}

export interface DashboardCustomerActivity {
  bookings: number;
}

export interface DashboardData {
  properties: DashboardProperties;
  units: DashboardUnits;
  tenants: DashboardTenants;
  staff: DashboardStaff;
  finance: DashboardFinance;
  customerActivity: DashboardCustomerActivity;
}

export interface DashboardResponse {
  status: boolean;
  data: DashboardData;
}