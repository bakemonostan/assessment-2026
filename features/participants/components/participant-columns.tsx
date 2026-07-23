"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/shared/table/ColumnHeader"
import { Badge } from "@/components/ui/badge"
import {
  STATUS_VARIANT,
  type Participant,
} from "@/features/participants/types/participant"
import { formatCurrency } from "@/features/participants/utils/format"

export function getParticipantColumns(): ColumnDef<Participant>[] {
  return [
    {
      accessorKey: "name",
      meta: { label: "Name" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Name" withSorting />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "email",
      meta: { label: "Email" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Email" withSorting />
      ),
    },
    {
      accessorKey: "phone",
      meta: { label: "Phone" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Phone" withSorting />
      ),
    },
    {
      accessorKey: "ticketsPurchased",
      meta: { label: "Tickets Purchased" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Tickets Purchased" withSorting />
      ),
      cell: ({ row }) => row.original.ticketsPurchased.toLocaleString(),
    },
    {
      accessorKey: "totalSpend",
      meta: { label: "Total Spend" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Total Spend" withSorting />
      ),
      cell: ({ row }) => formatCurrency(row.original.totalSpend),
    },
    {
      accessorKey: "status",
      meta: { label: "Status" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Status" withSorting />
      ),
      cell: ({ row }) => (
        <Badge
          variant={STATUS_VARIANT[row.original.status]}
          className="capitalize"
        >
          {row.original.status}
        </Badge>
      ),
    },
  ]
}
