"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { ModeToggle } from "@/components/mode-toggle"
import { DataTable } from "@/components/shared/table/DataTable"
import { getErrorMessage } from "@/lib/api/api.utils"
import { deleteDraw, listDraws, updateDraw } from "@/lib/api/draws"
import { toastApiError } from "@/lib/api/toast"
import { queryKeys } from "@/lib/query/keys"

import { getDemoColumns } from "./columns"
import type { DemoDraw } from "./data"
import {
  DeleteDrawModal,
  EditDrawModal,
  ViewDrawModal,
} from "./draw-modals"
import { DrawTableToolbar } from "./draw-table-toolbar"

export function TableDemo() {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState("all")
  const [selected, setSelected] = useState<DemoDraw | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null)

  const drawsQuery = useQuery({
    queryKey: queryKeys.draws.list({ status }),
    queryFn: () => listDraws({ status }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateDraw(id, { name }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.draws.all })
      toast.success("Draw updated")
      setMode(null)
    },
    onError: toastApiError,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDraw(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.draws.all })
      toast.success("Draw deleted")
      setMode(null)
    },
    onError: toastApiError,
  })

  const columns = useMemo(
    () =>
      getDemoColumns({
        onView: (draw) => {
          setSelected(draw)
          setMode("view")
        },
        onEdit: (draw) => {
          setSelected(draw)
          setMode("edit")
        },
        onDelete: (draw) => {
          setSelected(draw)
          setMode("delete")
        },
      }),
    []
  )

  const close = () => {
    if (updateMutation.isPending || deleteMutation.isPending) return
    setMode(null)
  }

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Table + modal demo</h1>
          <p className="text-sm text-muted-foreground">
            MSW + axios + TanStack Query: search, filter, sort, paginate, and
            mutate draws through mocked `/api/draws`.
          </p>
        </div>
        <ModeToggle />
      </div>

      {drawsQuery.isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {getErrorMessage(drawsQuery.error)}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={drawsQuery.data ?? []}
        isLoading={drawsQuery.isLoading}
        getRowId={(row) => row.id}
        isRowClickable={false}
        pageSize={5}
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
        onOpenChange={(open) => !open && close()}
      />
      <EditDrawModal
        draw={selected}
        open={mode === "edit"}
        onOpenChange={(open) => !open && close()}
        isPending={updateMutation.isPending}
        onSave={(name) => {
          if (!selected) return
          updateMutation.mutate({ id: selected.id, name })
        }}
      />
      <DeleteDrawModal
        draw={selected}
        open={mode === "delete"}
        onOpenChange={(open) => !open && close()}
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (!selected) return
          deleteMutation.mutate(selected.id)
        }}
      />
    </div>
  )
}
