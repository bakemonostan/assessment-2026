"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { EyeIcon } from "lucide-react"

import { ColumnHeader } from "@/components/shared/table/ColumnHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type {
  RecentWinner,
  WinnerStatus,
} from "@/features/dashboard/types/dashboard"
import { formatCurrency } from "@/features/dashboard/utils/format"

const STATUS_VARIANT: Record<
  WinnerStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "secondary",
  verified: "default",
  paid: "outline",
  rejected: "destructive",
}

export function getRecentWinnerColumns(): ColumnDef<RecentWinner>[] {
  return [
    {
      accessorKey: "winner",
      meta: { label: "Winner" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Winner" withSorting />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.winner}</span>
      ),
    },
    {
      accessorKey: "ticketNumber",
      meta: { label: "Ticket Number" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Ticket Number" withSorting />
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
      accessorKey: "status",
      meta: { label: "Status" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Status" withSorting />
      ),
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]} className="capitalize">
          {row.original.status}
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
          aria-label={`View winner ${row.original.winner}`}
          nativeButton={false}
          render={<Link href={`/winners/${row.original.id}`} />}
        >
          <EyeIcon />
        </Button>
      ),
    },
  ]
}
