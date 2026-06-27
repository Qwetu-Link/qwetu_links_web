import { api } from "@/lib/axios"
import { PropertiesFormValues, Property, PropertyResponse } from "../types/property.definations"
import { AxiosInstance } from "axios";

const PROPERTY_URL = "businesses/properties"
const PUBLIC_PROPERTY_URL = "public/properties"

export const getProperties = async (page = 1, apiInstance: AxiosInstance = api) => {
    const { data } = await apiInstance.get<PropertyResponse>(`${PROPERTY_URL}?page=${page}`);
    return data;
}

export const createProperty = async (data: PropertiesFormValues): Promise<Property> => {
    const response = await api.post(PROPERTY_URL, data);
    return response.data;
}

export const updateProperty = async ({ id, data }: { data: PropertiesFormValues, id: string }): Promise<Property> => {
    const response = await api.put(`${PROPERTY_URL}/${id}`, data);
    return response.data;
}

export const propertyDetails = async ({ id }: { id: string }) => {
    const response = await api.get(`${PROPERTY_URL}/${id}`)
    return response.data;
}

export const deleteProperty = async ({ id }: { id: string }) => {
    await api.delete(`${PROPERTY_URL}/${id}`);
}


//PUBLIC PROPERTY

export const getPublicProperties = async (page = 1, apiInstance: AxiosInstance = api) => {
    const { data } = await apiInstance.get<PropertyResponse>(`${PUBLIC_PROPERTY_URL}?page=${page}`);
    return data;
}

export const propertyPublicDetails = async ({ id }: { id: string }) => {
    const response = await api.get(`${PUBLIC_PROPERTY_URL}/${id}`)
    return response.data;
}

export const propertyPublicSlugDetails = async ({ slug }: { slug: string }) => {
    const {data}= await api.get(`${PUBLIC_PROPERTY_URL}/slug/${slug}`)
    return data;
}
