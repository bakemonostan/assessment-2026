"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import type { DashboardSeriesPoint } from "@/features/dashboard/types/dashboard"
import { formatCurrency, formatNumber } from "@/features/dashboard/utils/format"

const ticketConfig = {
  tickets: {
    label: "Tickets",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const revenueConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type DashboardChartsProps = {
  ticketSales: DashboardSeriesPoint[]
  revenueTrend: DashboardSeriesPoint[]
  isLoading?: boolean
  /** Admin sees both charts; Support sees ticket sales only */
  showRevenue?: boolean
}

export function DashboardCharts({
  ticketSales,
  revenueTrend,
  isLoading = false,
  showRevenue = true,
}: DashboardChartsProps) {
  if (isLoading) {
    return (
      <div
        className={
          showRevenue
            ? "grid grid-cols-1 gap-4 lg:grid-cols-2"
            : "grid grid-cols-1 gap-4"
        }
        aria-busy="true"
        aria-label="Loading charts"
      >
        {Array.from({ length: showRevenue ? 2 : 1 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[220px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <section
      aria-label="Dashboard charts"
      className={
        showRevenue
          ? "grid grid-cols-1 gap-4 lg:grid-cols-2"
          : "grid grid-cols-1 gap-4"
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Ticket Sales</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={ticketConfig}
            className="aspect-auto h-[220px] w-full"
            initialDimension={{ width: 320, height: 220 }}
          >
            <AreaChart
              accessibilityLayer
              data={ticketSales}
              margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                tickFormatter={(value) => formatNumber(Number(value))}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatNumber(Number(value))}
                  />
                }
              />
              <Area
                dataKey="tickets"
                type="monotone"
                fill="var(--color-tickets)"
                fillOpacity={0.2}
                stroke="var(--color-tickets)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {showRevenue ? (
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Last 30 days (NGN)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={revenueConfig}
              className="aspect-auto h-[220px] w-full"
              initialDimension={{ width: 320, height: 220 }}
            >
              <AreaChart
                accessibilityLayer
                data={revenueTrend}
                margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={24}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={52}
                  tickFormatter={(value) =>
                    `${Math.round(Number(value) / 1000)}k`
                  }
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="var(--color-revenue)"
                  fillOpacity={0.2}
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : null}
    </section>
  )
}
