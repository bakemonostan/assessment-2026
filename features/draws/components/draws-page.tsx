"use client"

import { useMemo, useState } from "react"

import { DataTable } from "@/components/shared/table/DataTable"
import { getDrawColumns } from "@/features/draws/components/draw-columns"
import {
  CancelDrawModal,
  EditDrawModal,
  ViewDrawModal,
} from "@/features/draws/components/draw-modals"
import { DrawTableToolbar } from "@/features/draws/components/draw-table-toolbar"
import {
  useCancelDrawMutation,
  useUpdateDrawMutation,
} from "@/features/draws/hooks/mutations"
import { useDrawsQuery } from "@/features/draws/hooks/queries"
import type { Draw } from "@/features/draws/types/draw"
import { getErrorMessage } from "@/lib/api/api.utils"

export function DrawsPage() {
  const [status, setStatus] = useState("all")
  const [selected, setSelected] = useState<Draw | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | "cancel" | null>(null)

  const drawsQuery = useDrawsQuery(status)

  const close = () => setMode(null)

  const updateMutation = useUpdateDrawMutation(close)
  const cancelMutation = useCancelDrawMutation(close)

  const columns = useMemo(
    () =>
      getDrawColumns({
        onView: (draw) => {
          setSelected(draw)
          setMode("view")
        },
        onEdit: (draw) => {
          setSelected(draw)
          setMode("edit")
        },
        onCancel: (draw) => {
          setSelected(draw)
          setMode("cancel")
        },
      }),
    []
  )

  const busy = updateMutation.isPending || cancelMutation.isPending

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">
          Draw Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Search, filter, and manage upcoming and active draws.
        </p>
      </header>

      {drawsQuery.isError ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {getErrorMessage(drawsQuery.error)}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={drawsQuery.data ?? []}
        isLoading={drawsQuery.isLoading}
        getRowId={(row) => row.id}
        isRowClickable={false}
        pageSize={8}
        emptyStateConfig={{
          title: "No draws found",
          description: "Try another search or clear the status filter.",
        }}
      >
        <DrawTableToolbar status={status} onStatusChange={setStatus} />
      </DataTable>

      <ViewDrawModal
        draw={selected}
        open={mode === "view"}
        onOpenChange={(open) => !open && !busy && close()}
      />
      <EditDrawModal
        draw={selected}
        open={mode === "edit"}
        onOpenChange={(open) => !open && !busy && close()}
        isPending={updateMutation.isPending}
        onSave={(name) => {
          if (!selected) return
          updateMutation.mutate({ id: selected.id, name })
        }}
      />
      <CancelDrawModal
        draw={selected}
        open={mode === "cancel"}
        onOpenChange={(open) => !open && !busy && close()}
        isPending={cancelMutation.isPending}
        onConfirm={() => {
          if (!selected) return
          cancelMutation.mutate(selected.id)
        }}
      />
    </div>
  )
}
