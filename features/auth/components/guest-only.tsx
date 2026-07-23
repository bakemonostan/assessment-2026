"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

import { getAuthSession } from "@/features/auth/utils/session"

/** Redirect signed-in users away from auth pages (login, etc.). */
export function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (getAuthSession()) {
      router.replace("/")
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  return children
}
