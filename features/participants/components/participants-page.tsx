"use client"

import { useMemo, useState } from "react"

import { DataTable } from "@/components/shared/table/DataTable"
import { getParticipantColumns } from "@/features/participants/components/participant-columns"
import { ParticipantTableToolbar } from "@/features/participants/components/participant-table-toolbar"
import { useParticipantsQuery } from "@/features/participants/hooks/queries"
import { getErrorMessage } from "@/lib/api/api.utils"

export function ParticipantsPage() {
  const [status, setStatus] = useState("all")
  const participantsQuery = useParticipantsQuery(status)
  const columns = useMemo(() => getParticipantColumns(), [])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Participants</h1>
        <p className="text-sm text-muted-foreground">
          Search, sort, and filter raffle participants.
        </p>
      </header>

      {participantsQuery.isError ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {getErrorMessage(participantsQuery.error)}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={participantsQuery.data ?? []}
        isLoading={participantsQuery.isLoading}
        getRowId={(row) => row.id}
        pageSize={10}
        emptyStateConfig={{
          title: "No participants found",
          description: "Try another search or clear the status filter.",
        }}
      >
        <ParticipantTableToolbar status={status} onStatusChange={setStatus} />
      </DataTable>
    </div>
  )
}
