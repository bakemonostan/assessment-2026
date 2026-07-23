"use client"

import { DataTable } from "@/components/shared/table/DataTable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PARTICIPANT_STATUS_OPTIONS } from "@/features/participants/types/participant"

type ParticipantTableToolbarProps = {
  status: string
  onStatusChange: (status: string) => void
}

export function ParticipantTableToolbar({
  status,
  onStatusChange,
}: ParticipantTableToolbarProps) {
  return (
    <DataTable.Filters layout="row" className="flex-wrap">
      <DataTable.Search placeholder="Search participants…" />
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
          {PARTICIPANT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTable.Export filename="participants.csv" />
      <DataTable.ViewOptions />
    </DataTable.Filters>
  )
}
