"use client"

import { useRouter } from "next/navigation"
import { useMemo } from "react"

import { DataTable } from "@/components/shared/table/DataTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRecentWinnerColumns } from "@/features/dashboard/components/recent-winners-columns"
import type { RecentWinner } from "@/features/dashboard/types/dashboard"

type RecentWinnersTableProps = {
  winners: RecentWinner[]
  isLoading?: boolean
}

export function RecentWinnersTable({
  winners,
  isLoading = false,
}: RecentWinnersTableProps) {
  const router = useRouter()
  const columns = useMemo(() => getRecentWinnerColumns(), [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Winners</CardTitle>
        <CardDescription>
          Latest verified and pending prize payouts
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pb-0">
        <DataTable
          columns={columns}
          data={winners}
          isLoading={isLoading}
          getRowId={(row) => row.id}
          isRowClickable
          onRowClick={(row) => router.push(`/winners/${row.id}`)}
          pageSize={5}
          emptyStateConfig={{
            title: "No recent winners",
            description: "Winners will appear here after draws complete.",
          }}
        >
          <DataTable.Filters layout="row" className="justify-end">
            <DataTable.Export filename="recent-winners.csv" />
          </DataTable.Filters>
        </DataTable>
      </CardContent>
    </Card>
  )
}
