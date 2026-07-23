export type WinnerStatus = "pending" | "verified" | "paid" | "rejected"

export type DashboardStat = {
  id: "ticketSales" | "activeUsers" | "revenueToday" | "pendingDraws"
  label: string
  value: number
  /** Optional short hint under the value */
  hint?: string
  format: "number" | "currency"
}

export type DashboardSeriesPoint = {
  date: string
  label: string
  tickets: number
  revenue: number
}

export type RecentWinner = {
  id: string
  winner: string
  ticketNumber: string
  draw: string
  prize: number
  status: WinnerStatus
}

export type DashboardData = {
  stats: DashboardStat[]
  ticketSales: DashboardSeriesPoint[]
  revenueTrend: DashboardSeriesPoint[]
  recentWinners: RecentWinner[]
}
