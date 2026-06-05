export const employmentTypeValues = [
  "full_time",
  "part_time",
  "contract",
  "intern",
  "temporary",
] as const;

export type EmploymentType = (typeof employmentTypeValues)[number];

export const employmentTypeLabels: Record<EmploymentType, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  intern: "Intern",
  temporary: "Temporary",
};

export type StaffMember = {
  id: string;
  position: string;
  department: string;
  salary: number;
  hire_date: string;
  employment_type: EmploymentType;
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
  is_active: boolean;
};

export const emptyStaffMember: StaffMember = {
  id: "",
  position: "",
  department: "",
  salary: 0,
  hire_date: "",
  employment_type: "full_time",
  username: "",
  name: "",
  email: "",
  password: "",
  role: "staff",
  phone: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  emergency_contact_relationship: "",
  id_number: "",
  address: "",
  avatar: "",
  is_active: true,
};

export const seededStaff: StaffMember[] = [
  {
    id: "staff-001",
    position: "Property Manager",
    department: "Operations",
    salary: 85000,
    hire_date: "2022-03-15",
    employment_type: "full_time",
    username: "jkamau",
    name: "John Kamau",
    email: "john.kamau@qwetulink.co.ke",
    password: "Password123!",
    role: "staff",
    phone: "+254712345678",
    emergency_contact_name: "Mary Kamau",
    emergency_contact_phone: "+254722345678",
    emergency_contact_relationship: "Spouse",
    id_number: "28456789",
    address: "Nyali, Mombasa",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    is_active: true,
  },
  {
    id: "staff-002",
    position: "Accountant",
    department: "Finance",
    salary: 65000,
    hire_date: "2023-01-10",
    employment_type: "part_time",
    username: "anjeri",
    name: "Alice Njeri",
    email: "alice.njeri@qwetulink.co.ke",
    password: "Password123!",
    role: "staff",
    phone: "+254723456789",
    emergency_contact_name: "Peter Njeri",
    emergency_contact_phone: "+254733456789",
    emergency_contact_relationship: "Brother",
    id_number: "31245678",
    address: "Bamburi, Mombasa",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    is_active: true,
  },
  {
    id: "staff-003",
    position: "Maintenance Technician",
    department: "Maintenance",
    salary: 45000,
    hire_date: "2024-06-01",
    employment_type: "contract",
    username: "omondi",
    name: "Kevin Omondi",
    email: "kevin.omondi@qwetulink.co.ke",
    password: "Password123!",
    role: "staff",
    phone: "+254734567890",
    emergency_contact_name: "Grace Omondi",
    emergency_contact_phone: "+254744567890",
    emergency_contact_relationship: "Mother",
    id_number: "35678901",
    address: "Likoni, Mombasa",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    is_active: false,
  },
  {
    id: "staff-004",
    position: "ICT Intern",
    department: "Information Technology",
    salary: 20000,
    hire_date: "2025-02-03",
    employment_type: "intern",
    username: "josephm",
    name: "Joseph Mwamuye",
    email: "joseph.mwamuye@qwetulink.co.ke",
    password: "Password123!",
    role: "staff",
    phone: "+254745678901",
    emergency_contact_name: "Sarah Mwamuye",
    emergency_contact_phone: "+254755678901",
    emergency_contact_relationship: "Sister",
    id_number: "39876543",
    address: "Mtwapa, Kilifi",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    is_active: true,
  },
];
