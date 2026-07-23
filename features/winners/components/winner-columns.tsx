"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { EyeIcon } from "lucide-react"

import { ColumnHeader } from "@/components/shared/table/ColumnHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  PAYMENT_STATUS_VARIANT,
  VERIFICATION_STATUS_VARIANT,
  type Winner,
} from "@/features/winners/types/winner"
import { formatCurrency } from "@/features/winners/utils/format"

export function getWinnerColumns(): ColumnDef<Winner>[] {
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
      accessorKey: "ticketNumber",
      meta: { label: "Ticket" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Ticket" withSorting />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.ticketNumber}</span>
      ),
    },
    {
      accessorKey: "draw",
      meta: { label: "Draw" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Draw" withSorting />
      ),
    },
    {
      accessorKey: "prize",
      meta: { label: "Prize" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Prize" withSorting />
      ),
      cell: ({ row }) => formatCurrency(row.original.prize),
    },
    {
      accessorKey: "paymentStatus",
      meta: { label: "Payment" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Payment" withSorting />
      ),
      cell: ({ row }) => (
        <Badge
          variant={PAYMENT_STATUS_VARIANT[row.original.paymentStatus]}
          className="capitalize"
        >
          {row.original.paymentStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "verificationStatus",
      meta: { label: "Verification" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Verification" withSorting />
      ),
      cell: ({ row }) => (
        <Badge
          variant={VERIFICATION_STATUS_VARIANT[row.original.verificationStatus]}
          className="capitalize"
        >
          {row.original.verificationStatus}
        </Badge>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`View winner ${row.original.name}`}
          nativeButton={false}
          render={<Link href={`/winners/${row.original.id}`} />}
        >
          <EyeIcon />
        </Button>
      ),
    },
  ]
}
