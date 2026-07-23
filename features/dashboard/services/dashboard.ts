import { api } from "@/lib/api/client"
import type { DashboardData } from "@/features/dashboard/types/dashboard"

type ApiDataResponse<T> = {
  data: T
}

export async function getDashboard() {
  const response = await api.get<ApiDataResponse<DashboardData>>("/api/dashboard")
  return response.data.data
}
