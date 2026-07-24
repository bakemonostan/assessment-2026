import { toast } from "sonner"

import { getErrorMessage } from "@/lib/api/api.utils"

/**
 * Show a Sonner error toast from any thrown API/unknown error.
 *
 * @example
 * ```ts
 * onError: toastApiError
 * ```
 */
export function toastApiError(error: unknown) {
  toast.error(getErrorMessage(error))
}
