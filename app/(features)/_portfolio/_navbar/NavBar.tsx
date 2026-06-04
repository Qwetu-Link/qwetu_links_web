"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/property" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const hiddenRoutes = [
  "/admin",
  "/caretaker",
  "/dashboard",
  "/forget-password",
  "/landlord",
  "/login",
  // "/register",
  "/reset-password",
  "/tenant",
  "/verify-email",
  "/help/",
  "/setup-business",
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  const isActive = (href: string) => {
    const route = href.split("#")[0];

    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rental-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex min-w-0 items-center gap-3 text-xl font-bold text-brand-dark sm:text-2xl"
        >
          <Image
            src="/images/_qwetu_logo_orange.webp"
            alt="QwetuRent Logo"
            width={60}
            height={60}
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
          />
          <span className="truncate">QwetuLinks</span>
        </Link>

        <nav className="hidden items-center gap-7 text-base font-medium text-slate-600 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition hover:text-rental-primary ${
                isActive(link.href) ? "text-rental-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="hidden items-center gap-2 rounded-md bg-rental-primary px-5 py-3 text-base font-semibold text-white transition hover:bg-orange-600 sm:inline-flex lg:px-6"
        >
          <span className="hidden lg:inline">List Your Property</span>
          <span className="lg:hidden">List Property</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-rental-border text-brand-dark transition hover:bg-rental-bg-light lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-rental-border bg-white px-4 py-4 shadow-lg shadow-slate-900/5 sm:px-6 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 transition hover:bg-rental-bg-light hover:text-rental-primary ${
                  isActive(link.href)
                    ? "bg-rental-bg-light text-rental-primary"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-rental-primary px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              List Your Property
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
