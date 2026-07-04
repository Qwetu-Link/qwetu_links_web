import { api } from "@/lib/axios"
import { AxiosInstance } from "axios";
import { deleteFile } from "@/utils/firebaseStorage";
import { Staff, StaffResponse } from "../types/staff.definations";
import { StaffUserFormValues } from "../schemas/staff.zod";

const STAFF_URL = "businesses/staff"

export const getStaffs = async (page = 1, search: string = "", apiInstance: AxiosInstance = api) => {
    const { data } = await apiInstance.get<StaffResponse>(STAFF_URL, {
        params: {
            page,
            ...(search ? { search } : {}),
        }
    });
    return data;
}

export const createStaff = async (data: StaffUserFormValues): Promise<Staff> => {
    const response = await api.post(STAFF_URL, data);
    return response.data;
}

export const updateStaff = async ({ id, data }: { data: StaffUserFormValues, id: string }): Promise<Staff> => {
    const response = await api.put(`${STAFF_URL}/${id}`, data);
    return response.data;
}

export const staffDetails = async ({ id }: { id: string }) => {
    const response = await api.get(`${STAFF_URL}/${id}`)
    return response.data?.data
}


export const deleteStaff = async ({ id, avatarPath }: { id: string; avatarPath?: string }) => {
    // 1. Delete the record from your database first
    await api.delete(`${STAFF_URL}/${id}`);

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