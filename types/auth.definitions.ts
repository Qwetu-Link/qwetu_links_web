// validations and types
export type Role = "owner" | "staff" | "tenant" | "qwetulinks";

export type User = {
  id: string;
  businessID: string;
  name: string;
  username: string;
  email: string;
  userType: Role;
  phone: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  idNumber?: string;
  address: string;
  isActive: boolean;
  avatar?: string;
  avatarPath?: string;
  version?: number;
  staff: [],
  tenant: []

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
