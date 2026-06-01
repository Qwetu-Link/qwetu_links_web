import { api } from "@/lib/axios";
import {
  AuthResponse,
  ForgotPasswordInputs,
  LoginFormInputs,
  RegisterFormInputs,
} from "./definitions";

const LOGIN_URL = "/login";
const REGISTER_URL = "/businesses";
const FORGOT_PASSWORD_URL = "/forgot-password";
const VERIFY_EMAIL_URL = "/verify-email";

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

export const logoutUser = async (): Promise<void> => {
  await api.post(`/businesses/logout`);
};

export const verifyEmail = async (
  token: string,
  email: string,
): Promise<void> => {
  await api.post(VERIFY_EMAIL_URL, { token, email });
};
