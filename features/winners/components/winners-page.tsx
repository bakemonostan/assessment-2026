"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { DataTable } from "@/components/shared/table/DataTable"
import { getWinnerColumns } from "@/features/winners/components/winner-columns"
import { WinnerTableToolbar } from "@/features/winners/components/winner-table-toolbar"
import { useWinnersQuery } from "@/features/winners/hooks/queries"
import { getErrorMessage } from "@/lib/api/api.utils"

export function WinnersPage() {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState("all")
  const winnersQuery = useWinnersQuery(paymentStatus)
  const columns = useMemo(() => getWinnerColumns(), [])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Winners</h1>
        <p className="text-sm text-muted-foreground">
          Search and filter winners, then open a record for full details.
        </p>
      </header>

      {winnersQuery.isError ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {getErrorMessage(winnersQuery.error)}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={winnersQuery.data ?? []}
        isLoading={winnersQuery.isLoading}
        getRowId={(row) => row.id}
        isRowClickable
        onRowClick={(row) => router.push(`/winners/${row.id}`)}
        pageSize={10}
        emptyStateConfig={{
          title: "No winners found",
          description: "Try another search or clear the payment filter.",
        }}
      >
        <WinnerTableToolbar
          paymentStatus={paymentStatus}
          onPaymentStatusChange={setPaymentStatus}
        />
      </DataTable>
    </div>
  )
}
