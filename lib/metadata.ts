import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qwetulinks.co.ke"
).replace(/\/$/, "");

const siteName = "Qwetu Links";
const defaultDescription =
  "Discover verified rental homes, compare property details, book viewings, and access practical tools for renters, landlords, and property managers.";
const defaultImage = "/icon1.png";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  index?: boolean;
};

export function createPageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = defaultImage,
  imageAlt = siteName,
  index = true,
}: PageMetadataOptions): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: siteName,
    authors: [{ name: `${siteName} Team` }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName,
      title,
      description,
      images: [
        {
          url: image,
          width: 512,
          height: 512,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    category: "real estate",
  };
}
