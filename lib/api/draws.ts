import { api } from "@/lib/api/client"
import type { Draw } from "@/features/draws/types/draw"
import {
  cancelDraw,
  listDraws,
  updateDraw,
} from "@/features/draws/services/draws"

export { listDraws, updateDraw, cancelDraw }

type ApiDataResponse<T> = {
  data: T
}

/** Hard delete — used by the demo table only. */
export async function deleteDraw(id: string) {
  const response = await api.delete<ApiDataResponse<{ id: string }>>(
    `/api/draws/${id}`
  )
  return response.data.data
}

export type { Draw }
