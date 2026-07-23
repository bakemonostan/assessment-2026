"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

import { getAuthSession } from "@/features/auth/utils/session"

/** Admin-only gate for draw management. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const session = getAuthSession()
    if (!session) {
      router.replace("/login")
      return
    }
    if (session.role !== "admin") {
      router.replace("/")
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
        Checking permissions…
      </div>
    )
  }

  return children
}
