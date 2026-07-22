import { ApiError, type ApiFieldErrors } from "@/lib/api/api.types"

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

/**
 * Safe user-facing message for toasts and inline errors.
 *
 * @example
 * ```ts
 * toast.error(getErrorMessage(error))
 * ```
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) return error.message
  if (error instanceof Error) return error.message
  if (typeof error === "string" && error.trim()) return error
  return "An unexpected error occurred"
}

export function getServerMessage(body: unknown): string | undefined {
  if (typeof body === "string") return body.trim() || undefined
  if (!body || typeof body !== "object") return undefined

  const record = body as Record<string, unknown>
  for (const key of ["message", "detail", "error", "title"]) {
    const value = record[key]
    if (typeof value === "string" && value.trim()) return value
  }

  const fieldErrors = getFieldErrors(body)
  if (!fieldErrors) return undefined
  return Object.values(fieldErrors).flat()[0]
}

export function getFieldErrors(body: unknown): ApiFieldErrors | undefined {
  if (!body || typeof body !== "object") return undefined

  const record = body as Record<string, unknown>
  const errors = record.errors ?? record.validationErrors
  if (!errors || typeof errors !== "object" || Array.isArray(errors)) {
    return undefined
  }

  const fieldErrors: ApiFieldErrors = {}

  for (const [field, value] of Object.entries(errors)) {
    if (typeof value === "string") {
      fieldErrors[field] = [value]
      continue
    }
    if (!Array.isArray(value)) continue

    const messages = value.filter(
      (item): item is string => typeof item === "string"
    )
    if (messages.length) fieldErrors[field] = messages
  }

  return Object.keys(fieldErrors).length ? fieldErrors : undefined
}

export function getHttpFallbackMessage(status: number): string {
  if (status === 400) return "Bad request. Please check your input."
  if (status === 401) return "Your session is not authorized."
  if (status === 403) return "You do not have permission for this action."
  if (status === 404) return "The requested resource was not found."
  if (status === 408) return "The request timed out."
  if (status === 422) return "Please correct the highlighted fields."
  if (status === 429) return "Too many requests. Please try again later."
  if (status >= 500) {
    return "The service is temporarily unavailable. Please try again later."
  }
  return `Request failed with status ${status}.`
}

export function createHttpError({
  status,
  body,
  requestId,
  cause,
}: {
  status: number
  body?: unknown
  requestId?: string
  cause?: unknown
}): ApiError {
  return new ApiError({
    kind: "http",
    status,
    message: getServerMessage(body) || getHttpFallbackMessage(status),
    body,
    requestId,
    fieldErrors: getFieldErrors(body),
    cause,
  })
}

/**
 * TanStack Query retry policy: retry transient failures only.
 */
export function shouldRetryRequest(
  failureCount: number,
  error: unknown
): boolean {
  if (failureCount >= 2) return false
  if (!isApiError(error)) return true
  if (error.kind === "network" || error.kind === "timeout") return true
  if (error.kind !== "http") return false

  return (
    error.status === 408 ||
    error.status === 429 ||
    (error.status !== undefined && error.status >= 500)
  )
}
