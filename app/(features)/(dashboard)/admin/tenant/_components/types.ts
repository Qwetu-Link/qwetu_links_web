import { Tenant } from "../definations";

export type { Tenant };

export interface TenantActionsProps {
  viewHref: string;
  editHref: string;
  onDelete: () => void;
}

export interface TenantStatusProps {
  tenant: Tenant;
}

export interface TenantIdentityProps {
  tenant: Tenant;
}

export interface TenantCardProps {
  tenant: Tenant;
  pathname: string;
  onDelete: (tenant: Tenant) => void;
}

export interface TenantTableProps {
  tenants: Tenant[];
  pathname: string;
  onDelete: (tenant: Tenant) => void;
}

export type TenantDetailsPageProps = {
  tenantId: string;
  listHref: string;
  editHref: string;
};
