export type ApiErrorKind = "http" | "network" | "timeout" | "parse"

export type ApiFieldErrors = Record<string, string[]>

/**
 * Normalized API error for axios + TanStack Query + Sonner.
 */
export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number
  readonly body?: unknown
  readonly requestId?: string
  readonly fieldErrors?: ApiFieldErrors

  constructor({
    kind,
    message,
    status,
    body,
    requestId,
    fieldErrors,
    cause,
  }: {
    kind: ApiErrorKind
    message: string
    status?: number
    body?: unknown
    requestId?: string
    fieldErrors?: ApiFieldErrors
    cause?: unknown
  }) {
    super(message, { cause })
    this.name = "ApiError"
    this.kind = kind
    this.status = status
    this.body = body
    this.requestId = requestId
    this.fieldErrors = fieldErrors
  }
}
