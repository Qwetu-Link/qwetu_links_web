import { useQuery } from "@tanstack/react-query";
import { DashboardData } from "@/types/dashboard.definitions";// your axios/fetch instance
import { fetchDashboardStats } from "@/services/dashboard.endpoints";

export function useDashboardStats() {
    return useQuery<DashboardData, Error>({
        queryKey: ["dashboard", "stats"],
        queryFn: fetchDashboardStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });
}