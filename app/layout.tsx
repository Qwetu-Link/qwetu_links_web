import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/lib/query-provider";
import NavBar from "../components/layouts/NavBar";
import PropertyFooter from "../components/layouts/PropertyFooter";
import { createPageMetadata } from "@/lib/metadata";

import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = createPageMetadata({
  title: "Qwetu Links | Rental Property Management",
  description:
    "Find verified rental properties, book viewings, and manage rental activity with Qwetu Links.",
  path: "/",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body
        className={`${inter.className} min-h-full flex flex-col antialiased`}
      >
        <QueryProvider>
          <NavBar />
          {children}
          <PropertyFooter />
        </QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
