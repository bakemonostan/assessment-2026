import { useQuery } from "@tanstack/react-query"

import {
  getWinner,
  listWinners,
} from "@/features/winners/services/winners"
import { queryKeys } from "@/lib/query/keys"

export function useWinnersQuery(paymentStatus: string) {
  return useQuery({
    queryKey: queryKeys.winners.list({ paymentStatus }),
    queryFn: () => listWinners({ paymentStatus }),
  })
}

export function useWinnerQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.winners.detail(id),
    queryFn: () => getWinner(id),
    enabled: Boolean(id),
  })
}
