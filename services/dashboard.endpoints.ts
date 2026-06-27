import { api } from "@/lib/axios";
import { DashboardData, DashboardResponse } from "@/types/dashboard.definitions";

// Admin Dashboard
export const fetchDashboardStats = async (): Promise<DashboardData> => {
    const response = await api.get<DashboardResponse>("dashboard/business/kpis");
    return response.data.data;
}
