import { api } from "@/lib/axios";
import { AuthResponse, LoginFormInputs } from "./definitions";

const LOGIN_URL = "/login";

export const loginUser = async (
  credentials: LoginFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(LOGIN_URL, credentials);
  return response.data;
};
