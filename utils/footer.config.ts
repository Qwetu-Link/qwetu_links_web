import { Bath, BedDouble, CalendarDays, Mail, MapPin, Phone, Ruler } from "lucide-react";

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
  { key: "squareMeters", icon: Ruler },
  { key: "bedrooms", icon: BedDouble },
  { key: "bathrooms", icon: Bath },
];