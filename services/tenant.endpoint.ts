import { api } from "@/lib/axios"
import { AxiosInstance } from "axios";
import { Tenant, TenantResponse } from "../types/tenant.definations";
import { TenantUserFormValues } from "../schemas/tenant.zod";
import { deleteFile } from "@/utils/firebaseStorage";

const TENANT_URL = "businesses/tenants"

export const getTenants = async (page = 1, search: string = "", apiInstance: AxiosInstance = api) => {
  const { data } = await apiInstance.get<TenantResponse>(TENANT_URL, {
    params: {
      page,
      search
    }
  });
  return data;
}

export const createTenant = async (data: TenantUserFormValues): Promise<Tenant> => {
  const response = await api.post(TENANT_URL, data);
  return response.data;
}

export const updateTenant = async ({ id, data }: { data: TenantUserFormValues, id: string }): Promise<Tenant> => {
  const response = await api.put(`${TENANT_URL}/${id}`, data);
  return response.data;
}

export const tenantDetails = async ({ id }: { id: string }) => {
  const response = await api.get(`${TENANT_URL}/${id}`)
  return response.data?.data
}

// export const deleteTenant = async ({ id }: { id: string }) => {
//     await api.delete(`${TENANT_URL}/${id}`);
// }

export const deleteTenant = async ({ id, avatarPath }: { id: string; avatarPath?: string }) => {
  // 1. Delete the record from your database first
  await api.delete(`${TENANT_URL}/${id}`);

  // 2. Clean up the media file from Firebase if it exists
  if (avatarPath) {
    try {
      await deleteFile(avatarPath);
      return { success: true, mediaDeleted: true };
    } catch (error) {
      console.warn(`Failed to clean up Firebase storage file at "${avatarPath}":`, error);
      // Return a partial success status so the hook knows the database delete worked but media failed
      return { success: true, mediaDeleted: false };
    }
  }

  return { success: true, mediaDeleted: null };
};