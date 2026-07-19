import { createPageMetadata } from "@/lib/metadata";
import { getPublicProperties } from "@/services/property.endpoints";
import { propertyPublicSlugDetails } from "@/services/property.endpoints";
import type { Metadata } from "next";
import PropertyClientPage from "./client-page";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await propertyPublicSlugDetails({ slug });
    const property = response?.data ?? response;
    const title = `${property.name} | Qwetu Links Property`;
    const description =
      property.description ||
      `View ${property.name} in ${property.location}, compare property details, and book a viewing through Qwetu Links.`;

    return createPageMetadata({
      title,
      description,
      path: `/property/${slug}`,
      image: property.images?.[0]?.url ?? "/icon1.png",
      imageAlt: property.name,
    });
  } catch {
    const title = `${titleFromSlug(slug)} | Qwetu Links Property`;

    return createPageMetadata({
      title,
      description:
        "View rental property details, amenities, location, and viewing options on Qwetu Links.",
      path: `/property/${slug}`,
    });
  }
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
//     })),
//   );
// }

export default async function Page({ params }: PropertyPageProps) {
  const { slug } = await params;

  return <PropertyClientPage slug={slug} />;
}
