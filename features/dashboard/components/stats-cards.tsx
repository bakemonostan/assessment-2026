import {
  BanknoteIcon,
  TicketIcon,
  UsersIcon,
  CalendarClockIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { DashboardStat } from "@/features/dashboard/types/dashboard"
import {
  formatCurrency,
  formatNumber,
} from "@/features/dashboard/utils/format"

const STAT_ICONS: Record<DashboardStat["id"], LucideIcon> = {
  ticketSales: TicketIcon,
  activeUsers: UsersIcon,
  revenueToday: BanknoteIcon,
  pendingDraws: CalendarClockIcon,
}

type StatsCardsProps = {
  stats: DashboardStat[]
  isLoading?: boolean
}

export function StatsCards({ stats, isLoading = false }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        aria-busy="true"
        aria-label="Loading dashboard stats"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} size="sm">
            <CardHeader>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-2 h-7 w-20" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <section
      aria-label="Dashboard summary"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.id]
        const display =
          stat.format === "currency"
            ? formatCurrency(stat.value)
            : formatNumber(stat.value)

        return (
          <Card key={stat.id} size="sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardDescription>{stat.label}</CardDescription>
                <Icon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                {display}
              </CardTitle>
            </CardHeader>
            {stat.hint ? (
              <CardContent>
                <p className="text-xs text-muted-foreground">{stat.hint}</p>
              </CardContent>
            ) : null}
          </Card>
        )
      })}
    </section>
  )
}
