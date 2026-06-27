import { api } from "@/lib/axios";
import { UnitFormValues } from "../schemas/units.zod";
import { UnitProperty } from "../types/unit.definations";

const UNIT_URL = "/businesses/units";

export const createUnit = async (
    data: UnitFormValues,
): Promise<UnitProperty> => {
    const unit = await api.post(UNIT_URL, data);
    return unit.data;
};

// export const getUnits = async (page = 1, apiInstance: AxiosInstance = api,): Promise<UnitsResponse> => {
//     const { data } = await apiInstance.get<UnitsResponse>(`${UNIT_URL}?page=${page}`);
//     return data;
// };

export const unitDetails = async ({ id }: { id: string }) => {
    const response = await api.get(`${UNIT_URL}/${id}`)
    return response.data;
}

export const updateUnit = async (
    {
        id,
        data,
    }: {
        id: string;
        data: UnitFormValues;
    }
): Promise<UnitProperty> => {
    const unit = await api.put(`${UNIT_URL}/${id}`, data);
    return unit.data;
};


export const deleteUnit = async ({ id }: { id: string }) => {
    await api.delete(`${UNIT_URL}/${id}`);
};
