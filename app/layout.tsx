import type { Metadata } from "next";
import { inter } from "@/app/fonts/fonts";
import "./styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import NavBar from "./(features)/_portfolio/_navbar/NavBar";
import PropertyFooter from "./(features)/_portfolio/_footer/PropertyFooter";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Qwetu Links",
  description: "Property and rental management platform",
  icons: {
    icon: "/logos/qwetu_logo.webp",
  },
};

import { Toaster } from "sonner";


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
