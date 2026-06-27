import {
  Home,
  Building2,
  MapPin,
  Search,
  Bed,
  Bath,
  Ruler,
  ShieldCheck,
  Users,
  KeyRound,
  Heart,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const properties = [
  {
    title: "Modern Apartment",
    location: "Nyali, Mombasa",
    price: "KES 45,000/mo",
    image:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    beds: 2,
    baths: 2,
    size: "120 sqm",
  },
  {
    title: "Luxury Villa",
    location: "Karen, Nairobi",
    price: "KES 180,000/mo",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    beds: 4,
    baths: 3,
    size: "350 sqm",
  },
  {
    title: "Studio Apartment",
    location: "Kilimani, Nairobi",
    price: "KES 28,000/mo",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    beds: 1,
    baths: 1,
    size: "65 sqm",
  },
];

const services = [
  {
    icon: Home,
    title: "Find Rentals",
    text: "Browse verified rental homes and apartments.",
  },
  {
    icon: KeyRound,
    title: "List Property",
    text: "Allow landlords to list units easily.",
  },
  {
    icon: Users,
    title: "Tenant Management",
    text: "Manage tenants, payments, and requests.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    text: "Build trust with approved listings.",
  },
];

export default function RentalPropertyPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f2] text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Home className="text-emerald-900" />
            QwetuRent
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">Properties</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>

          <button className="rounded-full bg-emerald-950 px-5 py-2 text-sm text-white">
            List Property
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-[2rem] min-h-[520px] bg-black">
          <Image
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
            alt="Modern rental home"
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            width={800}
            height={600}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
            <div className="max-w-xl text-white">
              <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-2 text-sm">
                Premium Rental Properties
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Find a Place That Truly Feels Like Home
              </h1>

              <p className="mt-5 max-w-md text-white/85">
                Discover verified apartments, villas, bedsitters, and commercial
                spaces in your preferred location.
              </p>
            </div>

            {/* Search Box */}
            <div className="rounded-3xl bg-emerald-950 p-4 shadow-xl">
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-medium">Mombasa</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs text-slate-500">Property Type</p>
                  <p className="font-medium">Apartment</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs text-slate-500">Budget</p>
                  <p className="font-medium">Any Price</p>
                </div>

                <button className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 font-semibold text-white">
                  <Search size={18} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Picks */}
        <aside className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top Picks</h2>
            <a className="text-sm font-medium text-emerald-900" href="#">
              View all
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {properties.slice(0, 2).map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute right-4 top-4 rounded-full bg-white p-2">
                    <Heart size={18} />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={14} />
                        {item.location}
                      </p>
                    </div>
                    <p className="font-bold text-emerald-900">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["250+", "Listed Properties"],
          ["10K+", "Happy Tenants"],
          ["25+", "Locations"],
          ["100%", "Verified Homes"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-emerald-950">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      {/* Property Types */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold">Property Types</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["Apartment", "Villa", "Bedsitter", "Commercial"].map((type) => (
            <div
              key={type}
              className="rounded-3xl bg-white p-8 text-center shadow-sm hover:shadow-md"
            >
              <Building2 className="mx-auto mb-4 text-emerald-900" />
              <h3 className="font-semibold">{type}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Rentals</h2>
          <a href="#" className="flex items-center gap-1 text-sm font-medium">
            View all <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="relative h-56">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
                <button className="absolute right-4 top-4 rounded-full bg-white p-2">
                  <Heart size={18} />
                </button>
              </div>

              <div className="p-5">
                <div className="mb-4 flex justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.location}</p>
                  </div>
                  <p className="font-bold text-emerald-900">{item.price}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Bed size={16} /> {item.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={16} /> {item.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler size={16} /> {item.size}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services + CTA */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Our Services</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl bg-white p-6">
                <service.icon className="mb-4 text-emerald-900" />
                <h3 className="font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{service.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[2rem] bg-emerald-950 p-8 text-white">
          <div>
            <h2 className="text-3xl font-bold">
              Want to rent, buy, or list a property?
            </h2>
            <p className="mt-4 text-white/75">
              Connect with trusted landlords, agents, and property managers.
            </p>
          </div>

          <button className="mt-8 w-fit rounded-full bg-emerald-500 px-6 py-3 font-semibold">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 px-6 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Home />
              QwetuRent
            </div>
            <p className="mt-3 text-sm text-white/70">
              Smart rental property platform for landlords and tenants.
            </p>
          </div>

          <div>
            <h4 className="font-bold">Quick Links</h4>
            <p className="mt-3 text-sm text-white/70">Home</p>
            <p className="mt-2 text-sm text-white/70">Properties</p>
            <p className="mt-2 text-sm text-white/70">About</p>
          </div>

          <div>
            <h4 className="font-bold">Services</h4>
            <p className="mt-3 text-sm text-white/70">Rent Property</p>
            <p className="mt-2 text-sm text-white/70">List Property</p>
            <p className="mt-2 text-sm text-white/70">Management</p>
          </div>

          <div>
            <h4 className="font-bold">Contact</h4>
            <p className="mt-3 text-sm text-white/70">Mombasa, Kenya</p>
            <p className="mt-2 text-sm text-white/70">info@qwetulent.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}