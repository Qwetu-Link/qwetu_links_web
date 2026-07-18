import type { MetadataRoute } from "next";
import { getPublicProperties } from "@/services/property.endpoints";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qwetulinks.co.ke")
  .replace(/\/$/, "");

const publicRoutes = [
  { path: "", priority: 1 },
  { path: "/property", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/overview", priority: 0.6 },
];

async function getPropertyRoutes() {
  try {
    const firstPage = await getPublicProperties();
    const totalPages = firstPage?.meta?.last_page ?? 1;
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) =>
        getPublicProperties(index + 2),
      ),
    );

    return [firstPage, ...remainingPages].flatMap((page) =>
      (page?.data ?? []).map((property) => ({
        path: `/property/${property.slug}`,
        priority: 0.8,
      })),
    );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const propertyRoutes = await getPropertyRoutes();

  return [...publicRoutes, ...propertyRoutes].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
