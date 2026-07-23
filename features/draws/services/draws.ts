import { api } from "@/lib/api/client"
import type { Draw, DrawStatus } from "@/features/draws/types/draw"

type ListDrawsParams = {
  status?: string
}

type ApiDataResponse<T> = {
  data: T
}

export async function listDraws(params: ListDrawsParams = {}) {
  const response = await api.get<ApiDataResponse<Draw[]>>("/api/draws", {
    params: {
      status:
        params.status && params.status !== "all" ? params.status : undefined,
    },
  })
  return response.data.data
}

export async function updateDraw(
  id: string,
  payload: { name?: string; status?: DrawStatus }
) {
  const response = await api.patch<ApiDataResponse<Draw>>(
    `/api/draws/${id}`,
    payload
  )
  return response.data.data
}

export async function cancelDraw(id: string) {
  return updateDraw(id, { status: "cancelled" })
}
