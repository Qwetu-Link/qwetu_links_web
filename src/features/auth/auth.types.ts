export type Role = "admin" | "landlord" | "caretaker" | "tenant";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}