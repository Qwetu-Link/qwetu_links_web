import { api } from "@/lib/axios";
import { AmenityFormValues, AmenitiesResponse, Amenity } from "../types/amenity.definations";
import { AxiosInstance } from "axios";

const AMENITY_URL = "/businesses/amenities";

export const createAmenity = async (
    data: AmenityFormValues,
): Promise<Amenity> => {
    const amenity = await api.post(AMENITY_URL, data);
    return amenity.data;
};

export const getAmenities = async (
  page = 1,
  perPage = 15,
  apiInstance: AxiosInstance = api,
): Promise<AmenitiesResponse> => {
  const { data } = await apiInstance.get<AmenitiesResponse>(
    `${AMENITY_URL}?page=${page}&per_page=${perPage}`
  );
  return data;
};

export const updateAmenity = async (
    {
        id,
        data,
    }: {
        id: string;
        data: AmenityFormValues;
    }
): Promise<Amenity> => {
    const amenity = await api.put(`${AMENITY_URL}/${id}`, data);
    return amenity.data;
};


export const delAmenity = async ({ id }: { id: string }) => {
    await api.delete(`${AMENITY_URL}/${id}`);
};
