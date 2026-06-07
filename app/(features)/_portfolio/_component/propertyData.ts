import {
  Bath,
  BedDouble,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";

export type PropertyUnit = {
  id: string;
  title: string;
  description: string;
  price: string;
  status: "Available" | "Occupied" | "Maintenance";
  size: string;
  beds: string;
  baths: string;
};

export type PropertyListingItem = {
  id: number;
  slug: string;
  status: string;
  type: string;
  price: string;
  title: string;
  location: string;
  image: string;
  size: string;
  beds: string;
  baths: string;
  category: string;
  highlights?: Array<string | { title: string; image: string }>;
  amenities?: Array<string | { title: string; icon?: string }>;
  gallery?: string[];
  units?: PropertyUnit[];
};

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

// export const propertyListings: PropertyListingItem[] = [
//   {
//     id: 1,
//     slug: "modern-two-bedroom-apartment-kilimani",
//     status: "For Rent",
//     type: "Apartment",
//     price: "KES 45,000",
//     title: "Modern Two Bedroom Apartment",
//     location: "Kilimani, Nairobi, Kenya",
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
//     size: "950 Sqft",
//     beds: "2 Bed",
//     baths: "2 Bath",
//     category: "rent",
//     highlights: [
//       "Modern finishes with natural lighting",
//       "Convenient access to Kilimani amenities",
//       "Ready for scheduled viewing",
//     ],
//     amenities: [
//       "Secure parking",
//       "Backup water",
//       "High-speed internet ready",
//       "24/7 security",
//       "Balcony",
//       "Lift access",
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
//     ],
//     units: [
//       {
//         id: "A-04",
//         title: "Apartment A-04",
//         description: "Two bedroom unit with balcony",
//         price: "KES 45,000",
//         status: "Available",
//         size: "950 Sqft",
//         beds: "2 Bed",
//         baths: "2 Bath",
//       },
//       {
//         id: "B-11",
//         title: "Apartment B-11",
//         description: "Two bedroom corner unit",
//         price: "KES 48,000",
//         status: "Occupied",
//         size: "980 Sqft",
//         beds: "2 Bed",
//         baths: "2 Bath",
//       },
//     ],
//   },
//   {
//     id: 2,
//     slug: "spacious-family-villa-runda",
//     status: "For Rent",
//     type: "Villa",
//     price: "KES 180,000",
//     title: "Spacious Family Villa",
//     location: "Runda, Nairobi, Kenya",
//     image:
//       "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
//     size: "3200 Sqft",
//     beds: "4 Bed",
//     baths: "4 Bath",
//     category: "rent",
//     highlights: [
//       "Spacious family layout",
//       "Private compound in a quiet neighbourhood",
//       "Ideal for long-term rental",
//     ],
//     amenities: [
//       "Private garden",
//       "Servant quarter",
//       "Covered parking",
//       "Gated community",
//       "Family lounge",
//       "Outdoor patio",
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
//     ],
//     units: [
//       {
//         id: "V-01",
//         title: "Main Villa",
//         description: "Four bedroom standalone residence",
//         price: "KES 180,000",
//         status: "Available",
//         size: "3200 Sqft",
//         beds: "4 Bed",
//         baths: "4 Bath",
//       },
//     ],
//   },
//   {
//     id: 3,
//     slug: "prime-commercial-office-space-westlands",
//     status: "For Rent",
//     type: "Office",
//     price: "KES 120,000",
//     title: "Prime Commercial Office Space",
//     location: "Westlands, Nairobi, Kenya",
//     image:
//       "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
//     size: "1400 Sqft",
//     beds: "Open Plan",
//     baths: "2 Bath",
//     category: "rent",
//     highlights: [
//       "Open-plan office space",
//       "Accessible Westlands business location",
//       "Suitable for teams and service businesses",
//     ],
//     amenities: [
//       "Reception area",
//       "Meeting room provision",
//       "Lift access",
//       "Backup power",
//       "Secure entry",
//       "Parking available",
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=900&q=80",
//     ],
//   },
//   {
//     id: 4,
//     slug: "three-bedroom-maisonette-nyali",
//     status: "For Rent",
//     type: "Building",
//     price: "KES 75,000",
//     title: "Three Bedroom Maisonette",
//     location: "Nyali, Mombasa, Kenya",
//     image:
//       "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
//     size: "1800 Sqft",
//     beds: "3 Bed",
//     baths: "3 Bath",
//     category: "rent",
//     highlights: [
//       "Family maisonette near coastal amenities",
//       "Generous room sizes",
//       "Good access to Nyali transport routes",
//     ],
//     amenities: [
//       "Parking",
//       "Water storage",
//       "Private entrance",
//       "Kitchen fittings",
//       "Security",
//       "Laundry area",
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80",
//     ],
//     units: [
//       {
//         id: "M-01",
//         title: "Maisonette Unit",
//         description: "Three bedroom maisonette",
//         price: "KES 75,000",
//         status: "Available",
//         size: "1800 Sqft",
//         beds: "3 Bed",
//         baths: "3 Bath",
//       },
//     ],
//   },
//   {
//     id: 5,
//     slug: "gated-community-family-home-kitengela",
//     status: "For Rent",
//     type: "Home",
//     price: "KES 18,500,000",
//     title: "Gated Community Family Home",
//     location: "Kitengela, Kajiado, Kenya",
//     image:
//       "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
//     size: "2200 Sqft",
//     beds: "3 Bed",
//     baths: "2 Bath",
//     category: "rent",
//     highlights: [
//       "Gated family community",
//       "Good space for families",
//       "Quiet Kitengela location",
//     ],
//     amenities: [
//       "Parking",
//       "Perimeter wall",
//       "Children play area",
//       "Water storage",
//       "Security",
//       "Garden space",
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
//     ],
//     units: [
//       {
//         id: "H-07",
//         title: "Family Home H-07",
//         description: "Three bedroom family home",
//         price: "KES 18,500,000",
//         status: "Available",
//         size: "2200 Sqft",
//         beds: "3 Bed",
//         baths: "2 Bath",
//       },
//     ],
//   },
//   {
//     id: 6,
//     slug: "retail-shop-with-street-frontage-nakuru",
//     status: "For Rent",
//     type: "Shop",
//     price: "KES 9,800,000",
//     title: "Retail Shop With Street Frontage",
//     location: "Nakuru CBD, Nakuru, Kenya",
//     image:
//       "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
//     size: "650 Sqft",
//     beds: "Retail",
//     baths: "1 Bath",
//     category: "rent",
//     highlights: [
//       "Street-facing retail frontage",
//       "Nakuru CBD foot traffic",
//       "Flexible shop layout",
//     ],
//     amenities: [
//       "Front display area",
//       "Secure shutters",
//       "Customer access",
//       "Storage corner",
//       "Washroom",
//       "Power connection",
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=900&q=80",
//       "https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=900&q=80",
//     ],
//   },
// ];

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
  { key: "square_meters", icon: Ruler },
  { key: "bedrooms", icon: BedDouble },
  { key: "bathrooms", icon: Bath },
];
