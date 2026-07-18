import LandingPage from "@/features/public/home/portfolio";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Qwetu Links Overview | Property Management Tools",
  description:
    "See how Qwetu Links brings property discovery, rent workflows, listings, and management tools into one practical rental platform.",
  path: "/overview",
});

export default function Page() {
  return <LandingPage />;
}
