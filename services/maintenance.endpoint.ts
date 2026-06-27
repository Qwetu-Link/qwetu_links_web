import { api } from "@/lib/axios"
import { AxiosInstance } from "axios";
import { AddMaintenanceFormValues, EditMaintenanceFormValues } from "../schemas/maintenance.zod";
import { MaintenanceRequest, MaintenanceResponse } from "../types/maintenance.definitions";

const MAINTENANCE_URL = "businesses/maintainance"

export const getMaintenances = async (page = 1, apiInstance: AxiosInstance = api) => {
    const { data } = await apiInstance.get<MaintenanceResponse>(`${MAINTENANCE_URL}?page=${page}`);
    return data;
}

export const createMaintenance = async (data:  AddMaintenanceFormValues): Promise<MaintenanceRequest> => {
    const response = await api.post(MAINTENANCE_URL, data);
    return response.data;
}

export const updateMaintenance = async ({ id, data }: { data: EditMaintenanceFormValues, id: string }): Promise<MaintenanceRequest> => {
    const response = await api.put(`${MAINTENANCE_URL}/${id}`, data);
    return response.data;
}

export const maintenanceDetails = async ({ id }: { id: string }) => {
    const response = await api.get(`${MAINTENANCE_URL}/${id}`)
    return response.data;
}

export const deleteMaintenance = async ({ id }: { id: string }) => {
    await api.delete(`${MAINTENANCE_URL}/${id}`);
}