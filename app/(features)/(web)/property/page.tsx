import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import PropertyClientPage from "./client-page";

export const metadata: Metadata = createPageMetadata({
  title: "Properties for Rent | Qwetu Links",
  description:
    "Browse verified rental homes, apartments, villas, and commercial spaces with clear property details and easy viewing access.",
  path: "/property",
});

export default function PropertyPage() {
  return <PropertyClientPage />;
}
