"use client"

import { useMemo, useState } from "react"

import { ModeToggle } from "@/components/mode-toggle"
import { DataTable } from "@/components/shared/table/DataTable"

import { getDemoColumns } from "./columns"
import { MOCK_DRAWS, type DemoDraw } from "./data"
import {
  DeleteDrawModal,
  EditDrawModal,
  ViewDrawModal,
} from "./draw-modals"
import { DrawTableToolbar } from "./draw-table-toolbar"

export function TableDemo() {
  const [draws, setDraws] = useState(MOCK_DRAWS)
  const [status, setStatus] = useState("all")
  const [selected, setSelected] = useState<DemoDraw | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null)

  const data =
    status === "all" ? draws : draws.filter((draw) => draw.status === status)

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

  const close = () => setMode(null)

  return (
    <div className="flex min-h-svh flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Table + modal demo</h1>
          <p className="text-sm text-muted-foreground">
            Search, filter, sort, hide/show columns, paginate, and open View /
            Edit / Delete modals from the row actions menu.
          </p>
        </div>
        <ModeToggle />
      </div>

      <DataTable
        columns={columns}
        data={data}
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
        onSave={(name) => {
          if (!selected) return
          setDraws((prev) =>
            prev.map((draw) =>
              draw.id === selected.id ? { ...draw, name } : draw
            )
          )
          close()
        }}
      />
      <DeleteDrawModal
        draw={selected}
        open={mode === "delete"}
        onOpenChange={(open) => !open && close()}
        onConfirm={() => {
          if (!selected) return
          setDraws((prev) => prev.filter((draw) => draw.id !== selected.id))
          close()
        }}
      />
    </div>
  )
}
