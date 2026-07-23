import type { UserRole } from "@/features/auth/types/role"

const SESSION_KEY = "techbox-auth-session"

export type AuthSession = {
  email: string
  role: UserRole
}

export function setAuthSession(session: AuthSession) {
  if (typeof window === "undefined") return
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null

  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_KEY)
}
