// validations and types
export type Role = "owner" | "staff" | "caretaker" | "tenant" | "qwetulinks";

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

export type ForgotPasswordInputs = {
  email: string;
};

export interface ResetPasswordInputs extends LoginFormInputs {
  token: string;
}

export interface RegisterFormInputs extends LoginFormInputs {
  name: string;
  phone: string;
  city: string;
  address: string;
}
export interface VerifyEmailInputs extends ForgotPasswordInputs {
  token: string;
}
export interface AuthResponse {
  user: User;
  token: string;
}
