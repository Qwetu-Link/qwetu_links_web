import PropertyPage from "@/features/public/property/propertyPage";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const title = "Qwetu Links | Find and Manage Rental Properties";
const description =
  "Discover verified rental homes, compare property details, book viewings, and access practical tools for renters, landlords, and property managers.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/",
});

export const revalidate = 86400;

export default function Home() {
  return <PropertyPage listingLimit={6} />;
}
