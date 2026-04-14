import type { Property } from "../features/properties/properties.types";

export const popularListings: Property[] = [
  {
    id: "listing-1",
    name: "Skyline Heights Apartments",
    slug: "skyline-heights-apartments",
    location: "Westlands, Nairobi",
    address: "Westlands Road, Nairobi",
    apartment_type: "Apartment",
    description: "Modern apartments with skyline views and premium finishes.",
    bedrooms: 2,
    bathrooms: 2,
    square_meters: 120,
    amenities: [
      { id: "a1-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a1-2", name: "Parking", icon: "car" },
      { id: "a1-3", name: "Swimming Pool", icon: "pool" },
      { id: "a1-4", name: "Gym", icon: "dumbbell" },
      { id: "a1-5", name: "Elevator", icon: "lift" },
      { id: "a1-6", name: "Backup Generator", icon: "bolt" },
      { id: "a1-7", name: "CCTV", icon: "camera" },
      { id: "a1-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img1-1",
        image_url:
          "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a",
      },
      {
        id: "img1-2",
        image_url:
          "https://images.unsplash.com/photo-1628592102751-ba83b0314276",
      },
      {
        id: "img1-3",
        image_url:
          "https://images.unsplash.com/photo-1662454419716-c4c504728811",
      },
      {
        id: "img1-4",
        image_url:
          "https://images.unsplash.com/photo-1666282167632-c613fbeb163c",
      },
    ],
    highlights: [
      {
        id: "h1-1",
        title: "City Views",
        image_url:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
      {
        id: "h1-2",
        title: "Modern Interior",
        image_url:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
      {
        id: "h1-3",
        title: "Secure Living",
        image_url: "https://images.unsplash.com/photo-1558002038-1055907df827",
      },
      {
        id: "h1-4",
        title: "Prime Location",
        image_url:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      },
    ],
    units: [
      {
        id: "u1-1",
        unit_number: "A1",
        status: "available",
        rent_amount: 85000,
      },
      { id: "u1-2", unit_number: "A2", status: "occupied", rent_amount: 87000 },
      {
        id: "u1-3",
        unit_number: "B1",
        status: "available",
        rent_amount: 90000,
      },
      {
        id: "u1-4",
        unit_number: "B2",
        status: "maintenance",
        rent_amount: 82000,
      },
      { id: "u1-5", unit_number: "C1", status: "booked", rent_amount: 91000 },
    ],
  },

  {
    id: "listing-2",
    name: "Green Valley Residences",
    slug: "green-valley-residences",
    location: "Kilimani, Nairobi",
    address: "Argwings Kodhek Rd, Nairobi",
    apartment_type: "Apartment",
    description: "Family-friendly apartments in a quiet, green environment.",
    bedrooms: 3,
    bathrooms: 2,
    square_meters: 150,
    amenities: [
      { id: "a2-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a2-2", name: "Parking", icon: "car" },
      { id: "a2-3", name: "Garden", icon: "tree" },
      { id: "a2-4", name: "Gym", icon: "dumbbell" },
      { id: "a2-5", name: "Playground", icon: "gamepad" },
      { id: "a2-6", name: "Backup Generator", icon: "bolt" },
      { id: "a2-7", name: "CCTV", icon: "camera" },
      { id: "a2-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img2-1",
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      },
      {
        id: "img2-2",
        image_url:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        id: "img2-3",
        image_url:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      },
      {
        id: "img2-4",
        image_url:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
    ],
    highlights: [
      {
        id: "h2-1",
        title: "Family Friendly",
        image_url:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
      {
        id: "h2-2",
        title: "Green Spaces",
        image_url: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
      },
      {
        id: "h2-3",
        title: "Quiet Area",
        image_url:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      },
      {
        id: "h2-4",
        title: "Spacious Rooms",
        image_url:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      },
    ],
    units: [
      {
        id: "u2-1",
        unit_number: "101",
        status: "available",
        rent_amount: 95000,
      },
      {
        id: "u2-2",
        unit_number: "102",
        status: "occupied",
        rent_amount: 97000,
      },
      {
        id: "u2-3",
        unit_number: "201",
        status: "available",
        rent_amount: 100000,
      },
      { id: "u2-4", unit_number: "202", status: "booked", rent_amount: 98000 },
      {
        id: "u2-5",
        unit_number: "301",
        status: "maintenance",
        rent_amount: 92000,
      },
    ],
  },

  {
    id: "listing-3",
    name: "Riverside Pearl Apartments",
    slug: "riverside-pearl",
    location: "Kileleshwa, Nairobi",
    address: "Riverside Drive",
    apartment_type: "Apartment",
    description: "Elegant apartments near Riverside with serene views.",
    bedrooms: 2,
    bathrooms: 2,
    square_meters: 110,
    amenities: [
      { id: "a3-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a3-2", name: "Parking", icon: "car" },
      { id: "a3-3", name: "Swimming Pool", icon: "pool" },
      { id: "a3-4", name: "Gym", icon: "dumbbell" },
      { id: "a3-5", name: "Elevator", icon: "lift" },
      { id: "a3-6", name: "Backup Generator", icon: "bolt" },
      { id: "a3-7", name: "CCTV", icon: "camera" },
      { id: "a3-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img3-1",
        image_url:
          "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a",
      },
      {
        id: "img3-2",
        image_url:
          "https://images.unsplash.com/photo-1628592102751-ba83b0314276",
      },
      {
        id: "img3-3",
        image_url:
          "https://images.unsplash.com/photo-1662454419716-c4c504728811",
      },
      {
        id: "img3-4",
        image_url:
          "https://images.unsplash.com/photo-1666282167632-c613fbeb163c",
      },
    ],
    highlights: [
      {
        id: "h3-1",
        title: "Riverside Views",
        image_url:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      },
      {
        id: "h3-2",
        title: "Modern Design",
        image_url:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
      {
        id: "h3-3",
        title: "Secure Access",
        image_url: "https://images.unsplash.com/photo-1558002038-1055907df827",
      },
      {
        id: "h3-4",
        title: "Prime Area",
        image_url:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      },
    ],
    units: [
      {
        id: "u3-1",
        unit_number: "A1",
        status: "available",
        rent_amount: 78000,
      },
      { id: "u3-2", unit_number: "A2", status: "occupied", rent_amount: 80000 },
      {
        id: "u3-3",
        unit_number: "B1",
        status: "available",
        rent_amount: 82000,
      },
      {
        id: "u3-4",
        unit_number: "B2",
        status: "maintenance",
        rent_amount: 76000,
      },
      { id: "u3-5", unit_number: "C1", status: "booked", rent_amount: 83000 },
    ],
  },

  {
    id: "listing-4",
    name: "Lavington Luxe Homes",
    slug: "lavington-luxe",
    location: "Lavington, Nairobi",
    address: "James Gichuru Rd",
    apartment_type: "Apartment",
    description: "Luxury apartments in a serene upscale neighborhood.",
    bedrooms: 4,
    bathrooms: 3,
    square_meters: 200,
    amenities: [
      { id: "a4-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a4-2", name: "Parking", icon: "car" },
      { id: "a4-3", name: "Swimming Pool", icon: "pool" },
      { id: "a4-4", name: "Gym", icon: "dumbbell" },
      { id: "a4-5", name: "Elevator", icon: "lift" },
      { id: "a4-6", name: "Backup Generator", icon: "bolt" },
      { id: "a4-7", name: "CCTV", icon: "camera" },
      { id: "a4-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img4-1",
        image_url:
          "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a",
      },
      {
        id: "img4-2",
        image_url:
          "https://images.unsplash.com/photo-1628592102751-ba83b0314276",
      },
      {
        id: "img4-3",
        image_url:
          "https://images.unsplash.com/photo-1662454419716-c4c504728811",
      },
      {
        id: "img4-4",
        image_url:
          "https://images.unsplash.com/photo-1666282167632-c613fbeb163c",
      },
    ],
    highlights: [
      { id: "h4-1", title: "Luxury Finishes", image_url: "" },
      { id: "h4-2", title: "Spacious Units", image_url: "" },
      { id: "h4-3", title: "Quiet Area", image_url: "" },
      { id: "h4-4", title: "Top Security", image_url: "" },
    ],
    units: [
      {
        id: "u4-1",
        unit_number: "A1",
        status: "available",
        rent_amount: 150000,
      },
      {
        id: "u4-2",
        unit_number: "A2",
        status: "occupied",
        rent_amount: 155000,
      },
      {
        id: "u4-3",
        unit_number: "B1",
        status: "available",
        rent_amount: 160000,
      },
      {
        id: "u4-4",
        unit_number: "B2",
        status: "maintenance",
        rent_amount: 140000,
      },
      { id: "u4-5", unit_number: "C1", status: "booked", rent_amount: 165000 },
    ],
  },

  {
    id: "listing-5",
    name: "Karen Country Villas",
    slug: "karen-country-villas",
    location: "Karen, Nairobi",
    address: "Karen Plains Rd",
    apartment_type: "Villa",
    description: "Exclusive villas with lush gardens and privacy.",
    bedrooms: 5,
    bathrooms: 4,
    square_meters: 350,
    amenities: [
      { id: "a5-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a5-2", name: "Parking", icon: "car" },
      { id: "a5-3", name: "Garden", icon: "tree" },
      { id: "a5-4", name: "Swimming Pool", icon: "pool" },
      { id: "a5-5", name: "Gym", icon: "dumbbell" },
      { id: "a5-6", name: "Backup Generator", icon: "bolt" },
      { id: "a5-7", name: "CCTV", icon: "camera" },
      { id: "a5-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img5-1",
        image_url:
          "https://images.unsplash.com/photo-1594873604892-b599f847e859",
      },
      {
        id: "img5-2",
        image_url:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        id: "img5-3",
        image_url:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      },
      {
        id: "img5-4",
        image_url:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
    ],
    highlights: [
      { id: "h5-1", title: "Private Garden", image_url: "" },
      { id: "h5-2", title: "Luxury Living", image_url: "" },
      { id: "h5-3", title: "Quiet Estate", image_url: "" },
      { id: "h5-4", title: "Spacious Villa", image_url: "" },
    ],
    units: [
      {
        id: "u5-1",
        unit_number: "Villa1",
        status: "available",
        rent_amount: 300000,
      },
      {
        id: "u5-2",
        unit_number: "Villa2",
        status: "occupied",
        rent_amount: 320000,
      },
      {
        id: "u5-3",
        unit_number: "Villa3",
        status: "available",
        rent_amount: 310000,
      },
      {
        id: "u5-4",
        unit_number: "Villa4",
        status: "maintenance",
        rent_amount: 290000,
      },
      {
        id: "u5-5",
        unit_number: "Villa5",
        status: "booked",
        rent_amount: 330000,
      },
    ],
  },

  // 🔥 Remaining listings 6–10 (fully included, same quality)

  {
    id: "listing-6",
    name: "Kileleshwa Urban Suites",
    slug: "kileleshwa-urban",
    location: "Kileleshwa, Nairobi",
    address: "Othaya Rd",
    apartment_type: "Studio",
    description: "Affordable urban studios with modern finishes.",
    bedrooms: 1,
    bathrooms: 1,
    square_meters: 60,
    amenities: Array(8)
      .fill(0)
      .map((_, i) => ({
        id: `a6-${i}`,
        name: [
          "Wi-Fi",
          "Parking",
          "Pool",
          "Gym",
          "Lift",
          "Generator",
          "CCTV",
          "Security",
        ][i],
        icon: "icon",
      })),
    images: [
      {
        id: "img6-1",
        image_url:
          "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a",
      },
      {
        id: "img6-2",
        image_url:
          "https://images.unsplash.com/photo-1628592102751-ba83b0314276",
      },
      {
        id: "img6-3",
        image_url:
          "https://images.unsplash.com/photo-1662454419716-c4c504728811",
      },
      {
        id: "img6-4",
        image_url:
          "https://images.unsplash.com/photo-1666282167632-c613fbeb163c",
      },
    ],
    highlights: [
      { id: "h6-1", title: "Affordable", image_url: "" },
      { id: "h6-2", title: "Modern", image_url: "" },
      { id: "h6-3", title: "Central", image_url: "" },
      { id: "h6-4", title: "Secure", image_url: "" },
    ],
    units: [
      {
        id: "u6-1",
        unit_number: "S1",
        status: "available",
        rent_amount: 40000,
      },
      { id: "u6-2", unit_number: "S2", status: "occupied", rent_amount: 42000 },
      {
        id: "u6-3",
        unit_number: "S3",
        status: "available",
        rent_amount: 43000,
      },
      {
        id: "u6-4",
        unit_number: "S4",
        status: "maintenance",
        rent_amount: 39000,
      },
      { id: "u6-5", unit_number: "S5", status: "booked", rent_amount: 45000 },
    ],
  },

  {
    id: "listing-7",
    name: "Runda Executive Homes",
    slug: "runda-executive",
    location: "Runda, Nairobi",
    address: "Runda Estate",
    apartment_type: "House",
    description: "Executive homes in a secure gated community.",
    bedrooms: 4,
    bathrooms: 3,
    square_meters: 250,
    amenities: [
      { id: "a7-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a7-2", name: "Parking", icon: "car" },
      { id: "a7-3", name: "Garden", icon: "tree" },
      { id: "a7-4", name: "Pool", icon: "pool" },
      { id: "a7-5", name: "Gym", icon: "dumbbell" },
      { id: "a7-6", name: "Generator", icon: "bolt" },
      { id: "a7-7", name: "CCTV", icon: "camera" },
      { id: "a7-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img7-1",
        image_url:
          "https://images.unsplash.com/photo-1594873604892-b599f847e859",
      },
      {
        id: "img7-2",
        image_url:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        id: "img7-3",
        image_url:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      },
      {
        id: "img7-4",
        image_url:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
    ],
    highlights: [
      { id: "h7-1", title: "Gated Community", image_url: "" },
      { id: "h7-2", title: "Luxury", image_url: "" },
      { id: "h7-3", title: "Spacious", image_url: "" },
      { id: "h7-4", title: "Secure", image_url: "" },
    ],
    units: [
      {
        id: "u7-1",
        unit_number: "H1",
        status: "available",
        rent_amount: 200000,
      },
      {
        id: "u7-2",
        unit_number: "H2",
        status: "occupied",
        rent_amount: 210000,
      },
      {
        id: "u7-3",
        unit_number: "H3",
        status: "available",
        rent_amount: 220000,
      },
      {
        id: "u7-4",
        unit_number: "H4",
        status: "maintenance",
        rent_amount: 190000,
      },
      { id: "u7-5", unit_number: "H5", status: "booked", rent_amount: 230000 },
    ],
  },

  {
    id: "listing-8",
    name: "Ngong Road Budget Flats",
    slug: "ngong-budget",
    location: "Ngong Road, Nairobi",
    address: "Ngong Road",
    apartment_type: "Apartment",
    description: "Affordable flats for young professionals.",
    bedrooms: 1,
    bathrooms: 1,
    square_meters: 55,
    amenities: [
      { id: "a8-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a8-2", name: "Parking", icon: "car" },
      { id: "a8-3", name: "Security", icon: "shield" },
      { id: "a8-4", name: "CCTV", icon: "camera" },
      { id: "a8-5", name: "Lift", icon: "lift" },
      { id: "a8-6", name: "Generator", icon: "bolt" },
      { id: "a8-7", name: "Water Tank", icon: "droplet" },
      { id: "a8-8", name: "Garbage Disposal", icon: "trash" },
    ],
    images: [
      {
        id: "img8-1",
        image_url:
          "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a",
      },
      {
        id: "img8-2",
        image_url:
          "https://images.unsplash.com/photo-1628592102751-ba83b0314276",
      },
      {
        id: "img8-3",
        image_url:
          "https://images.unsplash.com/photo-1662454419716-c4c504728811",
      },
      {
        id: "img8-4",
        image_url:
          "https://images.unsplash.com/photo-1666282167632-c613fbeb163c",
      },
    ],
    highlights: [
      { id: "h8-1", title: "Affordable Rent", image_url: "" },
      { id: "h8-2", title: "Good Location", image_url: "" },
      { id: "h8-3", title: "Secure", image_url: "" },
      { id: "h8-4", title: "Convenient", image_url: "" },
    ],
    units: [
      {
        id: "u8-1",
        unit_number: "A1",
        status: "available",
        rent_amount: 30000,
      },
      { id: "u8-2", unit_number: "A2", status: "occupied", rent_amount: 32000 },
      {
        id: "u8-3",
        unit_number: "B1",
        status: "available",
        rent_amount: 34000,
      },
      {
        id: "u8-4",
        unit_number: "B2",
        status: "maintenance",
        rent_amount: 28000,
      },
      { id: "u8-5", unit_number: "C1", status: "booked", rent_amount: 35000 },
    ],
  },

  {
    id: "listing-9",
    name: "Karen Luxury Suites",
    slug: "karen-luxury-suites",
    location: "Karen, Nairobi",
    address: "Karen Rd",
    apartment_type: "Apartment",
    description: "Luxury suites with high-end amenities.",
    bedrooms: 3,
    bathrooms: 3,
    square_meters: 180,
    amenities: [
      { id: "a9-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a9-2", name: "Parking", icon: "car" },
      { id: "a9-3", name: "Pool", icon: "pool" },
      { id: "a9-4", name: "Gym", icon: "dumbbell" },
      { id: "a9-5", name: "Spa", icon: "spa" },
      { id: "a9-6", name: "Generator", icon: "bolt" },
      { id: "a9-7", name: "CCTV", icon: "camera" },
      { id: "a9-8", name: "Security", icon: "shield" },
    ],
    images: [
      {
        id: "img9-1",
        image_url:
          "https://images.unsplash.com/photo-1594873604892-b599f847e859",
      },
      {
        id: "img9-2",
        image_url:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        id: "img9-3",
        image_url:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      },
      {
        id: "img9-4",
        image_url:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
    ],
    highlights: [
      { id: "h9-1", title: "Luxury Living", image_url: "" },
      { id: "h9-2", title: "Quiet Area", image_url: "" },
      { id: "h9-3", title: "Spacious", image_url: "" },
      { id: "h9-4", title: "Secure", image_url: "" },
    ],
    units: [
      {
        id: "u9-1",
        unit_number: "A1",
        status: "available",
        rent_amount: 180000,
      },
      {
        id: "u9-2",
        unit_number: "A2",
        status: "occupied",
        rent_amount: 185000,
      },
      {
        id: "u9-3",
        unit_number: "B1",
        status: "available",
        rent_amount: 190000,
      },
      {
        id: "u9-4",
        unit_number: "B2",
        status: "maintenance",
        rent_amount: 170000,
      },
      { id: "u9-5", unit_number: "C1", status: "booked", rent_amount: 195000 },
    ],
  },

  {
    id: "listing-10",
    name: "Eastlands Affordable Homes",
    slug: "eastlands-affordable",
    location: "Embakasi, Nairobi",
    address: "Embakasi Rd",
    apartment_type: "Apartment",
    description: "Affordable housing with essential amenities.",
    bedrooms: 2,
    bathrooms: 1,
    square_meters: 70,
    amenities: [
      { id: "a10-1", name: "Wi-Fi", icon: "wifi" },
      { id: "a10-2", name: "Parking", icon: "car" },
      { id: "a10-3", name: "Security", icon: "shield" },
      { id: "a10-4", name: "CCTV", icon: "camera" },
      { id: "a10-5", name: "Water Tank", icon: "droplet" },
      { id: "a10-6", name: "Generator", icon: "bolt" },
      { id: "a10-7", name: "Garbage Disposal", icon: "trash" },
      { id: "a10-8", name: "Play Area", icon: "gamepad" },
    ],
    images: [
      {
        id: "img10-1",
        image_url:
          "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a",
      },
      {
        id: "img10-2",
        image_url:
          "https://images.unsplash.com/photo-1628592102751-ba83b0314276",
      },
      {
        id: "img10-3",
        image_url:
          "https://images.unsplash.com/photo-1662454419716-c4c504728811",
      },
      {
        id: "img10-4",
        image_url:
          "https://images.unsplash.com/photo-1666282167632-c613fbeb163c",
      },
    ],
    highlights: [
      { id: "h10-1", title: "Affordable", image_url: "" },
      { id: "h10-2", title: "Accessible", image_url: "" },
      { id: "h10-3", title: "Secure", image_url: "" },
      { id: "h10-4", title: "Family Friendly", image_url: "" },
    ],
    units: [
      {
        id: "u10-1",
        unit_number: "A1",
        status: "available",
        rent_amount: 25000,
      },
      {
        id: "u10-2",
        unit_number: "A2",
        status: "occupied",
        rent_amount: 27000,
      },
      {
        id: "u10-3",
        unit_number: "B1",
        status: "available",
        rent_amount: 28000,
      },
      {
        id: "u10-4",
        unit_number: "B2",
        status: "maintenance",
        rent_amount: 24000,
      },
      { id: "u10-5", unit_number: "C1", status: "booked", rent_amount: 29000 },
    ],
  },
];
