import { useQuery } from "@tanstack/react-query"

import { listParticipants } from "@/features/participants/services/participants"
import { queryKeys } from "@/lib/query/keys"

export function useParticipantsQuery(status: string) {
  return useQuery({
    queryKey: queryKeys.participants.list({ status }),
    queryFn: () => listParticipants({ status }),
  })
}
