import Image from "next/image";
import Link from "next/link";
import { footerContacts, propertyListings } from "../propertyData";

const quickLinks = [
  "About Us",
  "Contact Us",
  "Our Services",
  "Privacy Policy",
  "Terms & Condition",
];

const footerMenu = ["Home", "Cookies", "Help", "FAQs"];
const socials = ["X", "F", "Y", "In"];

export default function PropertyFooter() {
  return (
    <footer className="mt-10 bg-brand-dark pt-16 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Get In Touch</h3>
          <div className="space-y-3">
            {footerContacts.map((item) => (
              <p key={item.label} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-rental-primary" />
                {item.label}
              </p>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            {socials.map((item) => (
              <a
                key={item}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-xs font-bold text-white transition hover:border-rental-primary hover:bg-rental-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Quick Links</h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="block transition hover:text-orange-300"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Photo Gallery
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {propertyListings.map((property) => (
              <div
                key={property.id}
                className="relative aspect-square overflow-hidden rounded-md bg-white p-1"
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="100px"
                  className="object-cover p-1"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Newsletter</h3>
          <p>Get the latest property updates and viewing opportunities.</p>
          <div className="relative mt-5">
            <input
              className="h-14 w-full rounded-md border border-white/20 bg-transparent px-4 pr-28 text-white outline-none focus:border-rental-primary"
              placeholder="Your email"
              type="email"
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-md bg-rental-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/overview" className="border-b border-white/40 text-white">
              Qwetu Links
            </Link>
            , All Right Reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {footerMenu.map((item) => (
              <Link key={item} href="#" className="transition hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
