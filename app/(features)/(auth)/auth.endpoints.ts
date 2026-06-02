import { api } from "@/lib/axios";
import {
  AuthResponse,
  ForgotPasswordInputs,
  LoginFormInputs,
  RegisterFormInputs,
  ResetPasswordInputs,
  VerifyEmailInputs,
} from "./definitions";

const LOGIN_URL = "/login";
const REGISTER_URL = "/businesses";
const FORGOT_PASSWORD_URL = "/forgot/password";
const VERIFY_EMAIL_URL = "/verify/email";
const RESET_PASSWORD_URL = "/reset/password";
const LOGOUT_URL = "/businesses/logout";

export const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/web/redirect`;

export const loginUser = async (
  credentials: LoginFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(LOGIN_URL, credentials);
  return response.data;
};

export const registerUser = async (
  data: RegisterFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(REGISTER_URL, data);
  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordInputs,
): Promise<void> => {
  await api.post(FORGOT_PASSWORD_URL, data);
};

export const resetPassword = async (
  data: ResetPasswordInputs,
): Promise<void> => {
  await api.post(RESET_PASSWORD_URL, data);
};

export const logoutUser = async (): Promise<void> => {
  await api.post(LOGOUT_URL);
};

export const verifyEmail = async (data: VerifyEmailInputs): Promise<void> => {
  await api.post(VERIFY_EMAIL_URL, data);
};
