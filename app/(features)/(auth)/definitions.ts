// validations and types
export type Role = "owner" | "staff" | "caretaker" | "tenant";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  staff: [];
  tenant: [];
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export interface RegisterFormInputs extends LoginFormInputs {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  password_confirm: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
