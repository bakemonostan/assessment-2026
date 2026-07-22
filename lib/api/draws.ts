import type { DemoDraw } from "@/components/demo-table/data"
import { api } from "@/lib/api/client"

type ListDrawsParams = {
  status?: string
}

type ApiListResponse<T> = {
  data: T
}

export async function listDraws(params: ListDrawsParams = {}) {
  const response = await api.get<ApiListResponse<DemoDraw[]>>("/api/draws", {
    params: {
      status: params.status && params.status !== "all" ? params.status : undefined,
    },
  })
  return response.data.data
}

export async function updateDraw(id: string, payload: { name: string }) {
  const response = await api.patch<ApiListResponse<DemoDraw>>(
    `/api/draws/${id}`,
    payload
  )
  return response.data.data
}

export async function deleteDraw(id: string) {
  const response = await api.delete<ApiListResponse<{ id: string }>>(
    `/api/draws/${id}`
  )
  return response.data.data
}
