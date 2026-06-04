import MaintenanceRequestFormPage from "@/app/(features)/(dashboard)/admin/maintenance/MaintenanceRequestFormPage";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <MaintenanceRequestFormPage
      mode="edit"
      basePath="/landlord/maintenance"
      requestId={id}
    />
  );
}
