import MaintenanceRequestsPage from "../../../../../features/private/maintenance/MaintenanceRequestsPage";

export const dynamic = "force-dynamic";
export default function Page() {
  return <MaintenanceRequestsPage basePath="/tenant/maintenance" />;
}
