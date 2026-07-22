"use client"

import { useEffect, useState, type ReactNode } from "react"

const mockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled"

async function enableMocking() {
  if (typeof window === "undefined" || !mockingEnabled) return
  const { worker } = await import("@/mocks/browser")
  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  })
}

export function MswProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!mockingEnabled)

  useEffect(() => {
    if (!mockingEnabled) return

    let active = true
    enableMocking().then(() => {
      if (active) setReady(true)
    })

    return () => {
      active = false
    }
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        Starting API mocks…
      </div>
    )
  }

  return children
}
