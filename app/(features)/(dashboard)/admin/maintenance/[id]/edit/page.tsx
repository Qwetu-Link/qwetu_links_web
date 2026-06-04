import MaintenanceRequestFormPage from "../../MaintenanceRequestFormPage";

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
      requestId={id}
      basePath="/admin/maintenance"
    />
  );
}
