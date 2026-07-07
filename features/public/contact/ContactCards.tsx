import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const contactCards = [
  {
    title: "Whatsapp",
    text: "",
    href: "tel:",
    icon: Phone,
  },
  {
    title: "Email support",
    text: "info@qwetulinks.co.ke",
    href: "mailto:info@rms.qwetulinks.co.ke",
    icon: Mail,
  },
  {
    title: "Visit office",
    text: "Qwetu Links Office, Marikani",
    href: "#office",
    icon: MapPin,
  },
];

export default function ContactCards() {
  return (
    <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {contactCards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-md border border-rental-border bg-white p-6 shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <item.icon className="mb-4 h-7 w-7 text-rental-primary" />
            <h2 className="text-lg font-bold text-brand-dark">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
