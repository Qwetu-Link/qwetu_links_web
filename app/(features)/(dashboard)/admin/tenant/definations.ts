
export type Tenant = {
  id: string;
  next_of_kin_name: string;
  next_of_kin_phone: string;
  is_active: boolean;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  id_number: string;
  address: string;
  avatar: string;
};

export const emptyTenant: Tenant = {
  id: "",
  next_of_kin_name: "",
  next_of_kin_phone: "",
  is_active: true,
  username: "",
  name: "",
  email: "",
  password: "",
  role: "tenant",
  phone: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  emergency_contact_relationship: "",
  id_number: "",
  address: "",
  avatar: "",
};

export const seededTenants: Tenant[] = [
  {
    id: "tenant-001",
    next_of_kin_name: "Mary Wanjiku",
    next_of_kin_phone: "+254712345679",
    is_active: true,
    username: "jkamau",
    name: "John Kamau",
    email: "john.kamau@example.com",
    password: "Password123!",
    role: "tenant",
    phone: "+254712345678",
    emergency_contact_name: "Mary Wanjiku",
    emergency_contact_phone: "+254712345679",
    emergency_contact_relationship: "Spouse",
    id_number: "28456789",
    address: "Nyali, Mombasa",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "tenant-002",
    next_of_kin_name: "Peter Njeri",
    next_of_kin_phone: "+254723456780",
    is_active: true,
    username: "anjeri",
    name: "Alice Njeri",
    email: "alice.njeri@example.com",
    password: "Password123!",
    role: "tenant",
    phone: "+254723456789",
    emergency_contact_name: "Peter Njeri",
    emergency_contact_phone: "+254723456780",
    emergency_contact_relationship: "Brother",
    id_number: "31245678",
    address: "Bamburi, Mombasa",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "tenant-003",
    next_of_kin_name: "Grace Omondi",
    next_of_kin_phone: "+254734567891",
    is_active: true,
    username: "komondi",
    name: "Kevin Omondi",
    email: "kevin.omondi@example.com",
    password: "Password123!",
    role: "tenant",
    phone: "+254734567890",
    emergency_contact_name: "Grace Omondi",
    emergency_contact_phone: "+254734567891",
    emergency_contact_relationship: "Mother",
    id_number: "35678901",
    address: "Likoni, Mombasa",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: "tenant-004",
    next_of_kin_name: "Sarah Mwamuye",
    next_of_kin_phone: "+254745678902",
    is_active: false,
    username: "jmwamuye",
    name: "Joseph Mwamuye",
    email: "joseph.mwamuye@example.com",
    password: "Password123!",
    role: "tenant",
    phone: "+254745678901",
    emergency_contact_name: "Sarah Mwamuye",
    emergency_contact_phone: "+254745678902",
    emergency_contact_relationship: "Sister",
    id_number: "39876543",
    address: "Mtwapa, Kilifi",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];
