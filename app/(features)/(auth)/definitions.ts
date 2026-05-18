// validations and types
export type Role = "owner" | "staff" | "caretaker" | "tenant";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  businessID: string;
  staff: [];
  tenant: [];
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export interface RegisterFormInputs extends LoginFormInputs {
  name: string;
  phone: string;
  city: string;
  address: string;
  is_active: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}
