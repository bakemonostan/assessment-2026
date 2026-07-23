import { api } from "@/lib/api/client"
import type { Participant } from "@/features/participants/types/participant"

type ListParticipantsParams = {
  status?: string
}

type ApiDataResponse<T> = {
  data: T
}

export async function listParticipants(params: ListParticipantsParams = {}) {
  const response = await api.get<ApiDataResponse<Participant[]>>(
    "/api/participants",
    {
      params: {
        status:
          params.status && params.status !== "all" ? params.status : undefined,
      },
    }
  )
  return response.data.data
}
