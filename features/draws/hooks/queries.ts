import { useQuery } from "@tanstack/react-query"

import { listDraws } from "@/features/draws/services/draws"
import { queryKeys } from "@/lib/query/keys"

export function useDrawsQuery(status: string) {
  return useQuery({
    queryKey: queryKeys.draws.list({ status }),
    queryFn: () => listDraws({ status }),
  })
}
