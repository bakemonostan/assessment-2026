import { useQuery } from "@tanstack/react-query"

import { getDashboard } from "@/features/dashboard/services/dashboard"
import { queryKeys } from "@/lib/query/keys"

export function useDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.lists(),
    queryFn: getDashboard,
  })
}
