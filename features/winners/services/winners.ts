import { api } from "@/lib/api/client"
import type {
  Winner,
  WinnerDetail,
} from "@/features/winners/types/winner"

type ListWinnersParams = {
  paymentStatus?: string
}

type ApiDataResponse<T> = {
  data: T
}

export async function listWinners(params: ListWinnersParams = {}) {
  const response = await api.get<ApiDataResponse<Winner[]>>("/api/winners", {
    params: {
      paymentStatus:
        params.paymentStatus && params.paymentStatus !== "all"
          ? params.paymentStatus
          : undefined,
    },
  })
  return response.data.data
}

export async function getWinner(id: string) {
  const response = await api.get<ApiDataResponse<WinnerDetail>>(
    `/api/winners/${id}`
  )
  return response.data.data
}
