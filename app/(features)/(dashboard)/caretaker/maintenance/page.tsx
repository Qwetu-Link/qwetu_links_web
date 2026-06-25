import MaintenanceRequestsPage from "../../admin/maintenance/_components/MaintenanceRequestsPage";

export const dynamic = "force-dynamic"

export default function Page() {
  return <MaintenanceRequestsPage basePath="/caretaker/maintenance" />;
}
