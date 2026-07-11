import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/lib/query-provider";
import NavBar from "../components/layouts/NavBar";
import PropertyFooter from "../components/layouts/PropertyFooter";

import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Qwetu Links",
    template: "%s-Qwetu Links"

  },
  description: "Property and rental management platform",
  twitter: {
    card: "summary_large_image"
  }
};



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
