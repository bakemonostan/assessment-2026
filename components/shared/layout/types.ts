import type { LucideIcon } from "lucide-react"

import type { UserRole } from "@/features/auth/types/role"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** Omit to show for every role */
  roles?: UserRole[]
}
