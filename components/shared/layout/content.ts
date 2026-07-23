import {
  LayoutDashboardIcon,
  TicketIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react"

import type { NavItem } from "./types"

export const SIDEBAR_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Draws",
    href: "/draws",
    icon: TicketIcon,
  },
  {
    label: "Participants",
    href: "/participants",
    icon: UsersIcon,
  },
  {
    label: "Winners",
    href: "/winners",
    icon: TrophyIcon,
  },
]
