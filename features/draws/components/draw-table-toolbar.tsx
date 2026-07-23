"use client"

import { DataTable } from "@/components/shared/table/DataTable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DRAW_STATUS_OPTIONS } from "@/features/draws/types/draw"

type DrawTableToolbarProps = {
  status: string
  onStatusChange: (status: string) => void
}

export function DrawTableToolbar({
  status,
  onStatusChange,
}: DrawTableToolbarProps) {
  return (
    <DataTable.Filters layout="row" className="flex-wrap">
      <DataTable.Search placeholder="Search draws…" />
      <Select
        value={status}
        onValueChange={(value) => {
          if (value != null) onStatusChange(String(value))
        }}
      >
        <SelectTrigger className="w-40" aria-label="Filter by status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {DRAW_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTable.ViewOptions />
    </DataTable.Filters>
  )
}
