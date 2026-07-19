import {
  decodePropertyToken,
  encodePropertyToken,
} from "@/components/custom/propertyToken";
import BookUnitForm from "@/features/forms/BookUnitForm";
import { createPageMetadata } from "@/lib/metadata";
import { getPublicProperties } from "@/services/property.endpoints";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BookingPageProps {
  params: Promise<{ slug: string; token: string }>;
}

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { slug, token } = await params;
  const property = decodePropertyToken(token);
  const propertyName = property?.propertyName ?? "Property Viewing";

  return createPageMetadata({
    title: `Book ${propertyName} | Qwetu Links`,
    description:
      "Book a private property viewing with Qwetu Links using a secure property booking link.",
    path: `/property/${slug}/booking/${token}`,
    index: false,
  });
}

// export async function generateStaticParams() {
//   const firstPage = await getPublicProperties();
//   const totalPages = firstPage?.meta?.last_page ?? 1;
//   const remainingPages = await Promise.all(
//     Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) =>
//       getPublicProperties(index + 2),
//     ),
//   );

//   return [firstPage, ...remainingPages].flatMap((page) =>
//     (page?.data ?? []).map((property) => ({
//       slug: property.slug,
//       token: encodePropertyToken({
//         propertyId: property.id,
//         propertyName: property.name,
//         propertySlug: property.slug,
//       }),
//     })),
//   );
// }

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug, token } = await params;
  const property = decodePropertyToken(token);

  // Redirect to 404 if the token is missing or tampered
  if (!property || property.propertySlug !== slug) notFound();

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
