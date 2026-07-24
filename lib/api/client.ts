import axios, { isAxiosError, isCancel } from "axios"

import { ApiError } from "@/lib/api/api.types"
import { createHttpError } from "@/lib/api/api.utils"

const API_TIMEOUT_MS = 15_000

/** Shared axios client — maps failures to {@link ApiError}. */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  timeout: API_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error)
    }

    if (isCancel(error) || error.code === "ERR_CANCELED") {
      return Promise.reject(error)
    }

    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return Promise.reject(
        new ApiError({
          kind: "timeout",
          message: `The request timed out after ${error.config?.timeout ?? API_TIMEOUT_MS}ms.`,
          cause: error,
        })
      )
    }

    if (!error.response) {
      return Promise.reject(
        new ApiError({
          kind: "network",
          message: "Unable to reach the server. Check your internet connection.",
          cause: error,
        })
      )
    }

    const { status, data, headers } = error.response
    const requestId = headers["x-request-id"]

    return Promise.reject(
      createHttpError({
        status,
        body: data,
        requestId: typeof requestId === "string" ? requestId : undefined,
        cause: error,
      })
    )
  }
)
