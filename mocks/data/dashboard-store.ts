import type { DashboardData } from "@/features/dashboard/types/dashboard"

function last30Days(): DashboardData["ticketSales"] {
  const points: DashboardData["ticketSales"] = []
  const end = new Date("2026-07-23")

  for (let i = 29; i >= 0; i -= 1) {
    const d = new Date(end)
    d.setDate(end.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    const day = d.getDate()
    // Deterministic mock curve — not random
    const tickets = 180 + ((day * 17) % 90) + (i % 5) * 12
    const revenue = tickets * (850 + (day % 7) * 40)

    points.push({
      date: iso,
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      tickets,
      revenue,
    })
  }

  return points
}

const series = last30Days()

/** In-memory dashboard payload for `/api/dashboard`. */
export const dashboardStore: DashboardData = {
  stats: [
    {
      id: "ticketSales",
      label: "Total Ticket Sales",
      value: 48_320,
      hint: "All-time tickets sold",
      format: "number",
    },
    {
      id: "activeUsers",
      label: "Active Users",
      value: 6_842,
      hint: "Last 30 days",
      format: "number",
    },
    {
      id: "revenueToday",
      label: "Revenue Today",
      value: 1_245_000,
      hint: "NGN",
      format: "currency",
    },
    {
      id: "pendingDraws",
      label: "Pending Draws",
      value: 5,
      hint: "Upcoming + active",
      format: "number",
    },
  ],
  ticketSales: series,
  revenueTrend: series,
  recentWinners: [
    {
      id: "w1",
      winner: "Adaobi Okonkwo",
      ticketNumber: "TB-88421",
      draw: "National Charity Raffle",
      prize: 250_000,
      status: "paid",
    },
    {
      id: "w2",
      winner: "Chinedu Eze",
      ticketNumber: "TB-77109",
      draw: "Healthcare Heroes",
      prize: 100_000,
      status: "verified",
    },
    {
      id: "w3",
      winner: "Fatima Bello",
      ticketNumber: "TB-90334",
      draw: "Green Energy Raffle",
      prize: 75_000,
      status: "pending",
    },
    {
      id: "w4",
      winner: "Ibrahim Yusuf",
      ticketNumber: "TB-65210",
      draw: "Summer Splash",
      prize: 50_000,
      status: "paid",
    },
    {
      id: "w5",
      winner: "Ngozi Adeyemi",
      ticketNumber: "TB-44188",
      draw: "Community Jackpot",
      prize: 120_000,
      status: "rejected",
    },
    {
      id: "w6",
      winner: "Tunde Bakare",
      ticketNumber: "TB-22901",
      draw: "TechBox Friday Special",
      prize: 40_000,
      status: "pending",
    },
  ],
}
