import { api } from "@/lib/axios";
import {
  AuthResponse,
  LoginFormInputs,
  RegisterFormInputs,
} from "./definitions";

const LOGIN_URL = "/login";
const REGISTER_URL = "/businesses";
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

export const logoutUser = async (businessID: string): Promise<void> => {
  if (!businessID) throw new Error("Business ID is required to logout.");
  await api.post(`/businesses/${businessID}/logout`);
};

export const verifyEmail = async (
  token: string,
  email: string,
): Promise<void> => {
  await api.post(VERIFY_EMAIL_URL, { token, email });
};
