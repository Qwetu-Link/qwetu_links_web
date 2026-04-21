import type { Role, User } from "@/features/auth/auth.types";


export const FAKE_USERS: Record<Role, User> = {
  admin: {
    id: "1",
    name: "Admin",
    email: "admin@qwetu.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
  },
  landlord: {
    id: "2",
    name: "Landlord",
    email: "landlord@qwetu.com",
    role: "landlord",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=larry",
  },
  caretaker: {
    id: "3",
    name: "Caretaker",
    email: "caretaker@qwetu.com",
    role: "caretaker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
  },
  tenant: {
    id: "4",
    name: "Tenant",
    email: "tenant@qwetu.com",
    role: "tenant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
  },
};