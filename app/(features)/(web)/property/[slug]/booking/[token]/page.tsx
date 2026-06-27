import { decodePropertyToken } from "@/components/custom/propertyToken";
import BookUnitForm from "@/features/forms/BookUnitForm";
import { notFound } from "next/navigation";

interface BookingPageProps {
  params: Promise<{ token: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { token } = await params;
  const property = decodePropertyToken(token);

  // Redirect to 404 if the token is missing or tampered
  if (!property) notFound();

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <BookUnitForm
          propertyID={property.propertyId}
          propertyName={property.propertyName}
        />
      </div>
    </main>
  );
}