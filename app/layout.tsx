import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "@/lib/query-provider";
import NavBar from "../components/layouts/NavBar";
import PropertyFooter from "../components/layouts/PropertyFooter";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Qwetu Links",
  description: "Property and rental management platform",
  icons: {
    icon: "/logos/qwetu_logo.webp",
  },
};

import { Toaster } from "sonner";
// import FirebaseAuthProvider from "@/lib/FirebaseAuthProvider";


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
          {/* <FirebaseAuthProvider> */}
            {children}
          {/* </FirebaseAuthProvider> */}
          <PropertyFooter />
        </QueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
