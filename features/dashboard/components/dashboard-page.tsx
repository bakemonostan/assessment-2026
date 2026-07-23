"use client"

import { useMemo } from "react"

import { DashboardCharts } from "@/features/dashboard/components/dashboard-charts"
import { RecentWinnersTable } from "@/features/dashboard/components/recent-winners-table"
import { StatsCards } from "@/features/dashboard/components/stats-cards"
import { useDashboardQuery } from "@/features/dashboard/hooks/queries"
import type { DashboardStat } from "@/features/dashboard/types/dashboard"
import { getAuthSession } from "@/features/auth/utils/session"
import { getErrorMessage } from "@/lib/api/api.utils"

/** Support can monitor ops; revenue metrics stay admin-only. */
function filterStatsForRole(
  stats: DashboardStat[],
  role: string | undefined
): DashboardStat[] {
  if (role === "support") {
    return stats.filter((stat) => stat.id !== "revenueToday")
  }
  return stats
}

export function DashboardPage() {
  const session = getAuthSession()
  const isAdmin = session?.role === "admin"
  const dashboardQuery = useDashboardQuery()

  const stats = useMemo(
    () => filterStatsForRole(dashboardQuery.data?.stats ?? [], session?.role),
    [dashboardQuery.data?.stats, session?.role]
  )

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {session
            ? `Signed in as ${session.email} · ${session.role}`
            : "Overview of ticket sales, revenue, and recent winners."}
        </p>
      </header>

      {dashboardQuery.isError ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {getErrorMessage(dashboardQuery.error)}
        </div>
      ) : null}

      <StatsCards stats={stats} isLoading={dashboardQuery.isLoading} />

      <DashboardCharts
        ticketSales={dashboardQuery.data?.ticketSales ?? []}
        revenueTrend={dashboardQuery.data?.revenueTrend ?? []}
        isLoading={dashboardQuery.isLoading}
        showRevenue={isAdmin}
      />

      <RecentWinnersTable
        winners={dashboardQuery.data?.recentWinners ?? []}
        isLoading={dashboardQuery.isLoading}
      />
    </div>
  )
}
