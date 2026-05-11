import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { inter } from "@/app/fonts/fonts";
import "./styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Qwetu Links",
  description: "Property and rental management platform",
  icons: {
    icon: "/logos/qwetu_logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body
        className={`${inter.className} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
