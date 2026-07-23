export type DrawStatus = "upcoming" | "active" | "completed" | "cancelled"

export type Draw = {
  id: string
  name: string
  drawDate: string
  ticketCount: number
  prizePool: number
  status: DrawStatus
}

export const STATUS_VARIANT: Record<
  DrawStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  upcoming: "secondary",
  active: "default",
  completed: "outline",
  cancelled: "destructive",
}

export const DRAW_STATUS_OPTIONS: { label: string; value: DrawStatus | "all" }[] =
  [
    { label: "All statuses", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ]

export function canCancelDraw(status: DrawStatus) {
  return status === "upcoming" || status === "active"
}
