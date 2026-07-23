import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { cancelDraw, updateDraw } from "@/features/draws/services/draws"
import { toastApiError } from "@/lib/api/toast"
import { queryKeys } from "@/lib/query/keys"

export function useUpdateDrawMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateDraw(id, { name }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.draws.all })
      toast.success("Draw updated")
      onSuccess?.()
    },
    onError: toastApiError,
  })
}

export function useCancelDrawMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cancelDraw(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.draws.all })
      toast.success("Draw cancelled")
      onSuccess?.()
    },
    onError: toastApiError,
  })
}
