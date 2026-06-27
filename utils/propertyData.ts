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
