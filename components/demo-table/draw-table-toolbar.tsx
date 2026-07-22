"use client"

import { DataTable } from "@/components/shared/table/DataTable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      <DataTable.Search placeholder="Search draws..." />
      <Select
        value={status}
        onValueChange={(value) => {
          if (value != null) onStatusChange(String(value))
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <DataTable.ViewOptions />
    </DataTable.Filters>
  )
}
