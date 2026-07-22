"use client"

import type { ReactNode } from "react"

import { MswProvider } from "@/components/providers/msw-provider"
import { QueryProvider } from "@/components/providers/query-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MswProvider>
      <QueryProvider>{children}</QueryProvider>
    </MswProvider>
  )
}
