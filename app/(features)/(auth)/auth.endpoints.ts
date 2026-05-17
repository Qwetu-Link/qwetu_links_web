import { api } from "@/lib/axios";
import {
  AuthResponse,
  LoginFormInputs,
  RegisterFormInputs,
} from "./definitions";

const LOGIN_URL = "/login";
const REGISTER_URL = "/businesses";

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
