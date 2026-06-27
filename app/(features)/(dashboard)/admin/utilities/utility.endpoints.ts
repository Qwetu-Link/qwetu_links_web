import { api } from "@/lib/axios"
import { AxiosInstance } from "axios";
import { Utility, UtilityPaginatedResponse } from "./definations";
import { UtilityFormValues } from "./utility.zod";

const UTILITY_URL = "businesses/utilities"

export const getUtility = async (page = 1, apiInstance: AxiosInstance = api) => {
    const { data } = await apiInstance.get<UtilityPaginatedResponse>(`${UTILITY_URL}?page=${page}`);
    return data;
}

export const createUtility = async (data: UtilityFormValues): Promise<Utility> => {
    const response = await api.post(UTILITY_URL, data);
    return response.data;
}

export const updateUtility = async ({ id, data }: { data: UtilityFormValues, id: string }): Promise<Utility> => {
    const response = await api.put(`${UTILITY_URL}/${id}`, data);
    return response.data;
}

export const utilityDetails = async ({ id }: { id: string }) => {
    const response = await api.get(`${UTILITY_URL}/${id}`)
    return response.data;
}

export const deleteUtility = async ({ id }: { id: string }) => {
    await api.delete(`${UTILITY_URL}/${id}`);
}