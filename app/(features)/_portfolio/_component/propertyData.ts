import {
  Bath,
  BedDouble,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";

export const propertyTypes = [
  {
    title: "Apartment",
    count: "123 Properties",
    icon: "/img/residential.png",
  },
  {
    title: "Villa",
    count: "123 Properties",
    icon: "/img/villa.png",
  },
  {
    title: "Home",
    count: "123 Properties",
    icon: "/img/modern-house.png",
  },
  {
    title: "Shop",
    count: "123 Properties",
    icon: "/img/shop.png",
  }
];

export const heroImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
];

export const kenyaCounties = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita Taveta",
  "Tana River",
  "Tharaka Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

export const propertyListings = [
  {
    id: 1,
    slug: "modern-two-bedroom-apartment-kilimani",
    status: "For Rent",
    type: "Apartment",
    price: "KES 45,000",
    title: "Modern Two Bedroom Apartment",
    location: "Kilimani, Nairobi, Kenya",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
    size: "950 Sqft",
    beds: "2 Bed",
    baths: "2 Bath",
    category: "rent",
  },
  {
    id: 2,
    slug: "spacious-family-villa-runda",
    status: "For Rent",
    type: "Villa",
    price: "KES 180,000",
    title: "Spacious Family Villa",
    location: "Runda, Nairobi, Kenya",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
    size: "3200 Sqft",
    beds: "4 Bed",
    baths: "4 Bath",
    category: "rent",
  },
  {
    id: 3,
    slug: "prime-commercial-office-space-westlands",
    status: "For Rent",
    type: "Office",
    price: "KES 120,000",
    title: "Prime Commercial Office Space",
    location: "Westlands, Nairobi, Kenya",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    size: "1400 Sqft",
    beds: "Open Plan",
    baths: "2 Bath",
    category: "rent",
  },
  {
    id: 4,
    slug: "three-bedroom-maisonette-nyali",
    status: "For Rent",
    type: "Building",
    price: "KES 75,000",
    title: "Three Bedroom Maisonette",
    location: "Nyali, Mombasa, Kenya",
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
    size: "1800 Sqft",
    beds: "3 Bed",
    baths: "3 Bath",
    category: "rent",
  },
  {
    id: 5,
    slug: "gated-community-family-home-kitengela",
    status: "For Rent",
    type: "Home",
    price: "KES 18,500,000",
    title: "Gated Community Family Home",
    location: "Kitengela, Kajiado, Kenya",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    size: "2200 Sqft",
    beds: "3 Bed",
    baths: "2 Bath",
    category: "rent",
  },
  {
    id: 6,
    slug: "retail-shop-with-street-frontage-nakuru",
    status: "For Rent",
    type: "Shop",
    price: "KES 9,800,000",
    title: "Retail Shop With Street Frontage",
    location: "Nakuru CBD, Nakuru, Kenya",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    size: "650 Sqft",
    beds: "Retail",
    baths: "1 Bath",
    category: "rent",
  },
];

export const featureChecks = [
  "Verified listings with clear property details",
  "Helpful support from search to viewing",
  "Flexible options for renters",
];

export const contactActions = [
  { label: "Make A Call", icon: Phone, href: "tel:+254700000000" },
  { label: "Get Appointment", icon: CalendarDays, href: "#" },
];

export const footerContacts = [
  { label: "Westlands, Nairobi, Kenya", icon: MapPin },
  { label: "+254 700 000 000", icon: Phone },
  { label: "info@qwetulinks.co.ke", icon: Mail },
];

export const propertyStats = [
  { key: "size", icon: Ruler },
  { key: "beds", icon: BedDouble },
  { key: "baths", icon: Bath },
];
