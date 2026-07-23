"use client"

import { DataTable } from "@/components/shared/table/DataTable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PAYMENT_STATUS_OPTIONS } from "@/features/winners/types/winner"

type WinnerTableToolbarProps = {
  paymentStatus: string
  onPaymentStatusChange: (status: string) => void
}

export function WinnerTableToolbar({
  paymentStatus,
  onPaymentStatusChange,
}: WinnerTableToolbarProps) {
  return (
    <DataTable.Filters layout="row" className="flex-wrap">
      <DataTable.Search placeholder="Search winners…" />
      <Select
        value={paymentStatus}
        onValueChange={(value) => {
          if (value != null) onPaymentStatusChange(String(value))
        }}
      >
        <SelectTrigger className="w-44" aria-label="Filter by payment status">
          <SelectValue placeholder="Payment" />
        </SelectTrigger>
        <SelectContent>
          {PAYMENT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTable.Export filename="winners.csv" />
      <DataTable.ViewOptions />
    </DataTable.Filters>
  )
}
