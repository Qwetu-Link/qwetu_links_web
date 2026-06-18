import { api } from "@/lib/axios";
import { Business, RegisterBusinessFormInputs } from "./definations";
import {
  AuthResponse,
  VerifyEmailInputs,
} from "@/app/(features)/(auth)/definitions";

const BIZ_URL = "/businesses";
const VERIFY_EMAIL_URL = "/verify/email";

type BusinessListResponse =
  | Business[]
  | {
      results?: Business[];
      data?: Business[];
    };

export const getBusinesses = async (): Promise<Business[]> => {
  const response = await api.get<BusinessListResponse>(BIZ_URL);
  const payload = response.data;

  if (Array.isArray(payload)) return payload;
  return payload.results ?? payload.data ?? [];
};

export const getBizDetails = async (id: string): Promise<Business> => {
  const response = await api.get<Business>(`${BIZ_URL}/${id}`);
  console.log("Test getBiz service", response);
  return response.data;
};

export const registerBiz = async (
  data: RegisterBusinessFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(BIZ_URL, data);
  return response.data;
};

export const updateBusiness = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<RegisterBusinessFormInputs>;
}): Promise<Business> => {
  const response = await api.patch<Business>(`${BIZ_URL}/${id}`, data);
  return response.data;
};

export const verifyEmail = async (data: VerifyEmailInputs): Promise<void> => {
  await api.post(VERIFY_EMAIL_URL, data);
};
