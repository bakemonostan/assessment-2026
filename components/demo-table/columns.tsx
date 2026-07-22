"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { ColumnHeader } from "@/components/shared/table/ColumnHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  formatCurrency,
  STATUS_VARIANT,
  type DemoDraw,
} from "./data"

type Actions = {
  onView: (draw: DemoDraw) => void
  onEdit: (draw: DemoDraw) => void
  onDelete: (draw: DemoDraw) => void
}

export function getDemoColumns(actions: Actions): ColumnDef<DemoDraw>[] {
  return [
    {
      accessorKey: "name",
      meta: { label: "Draw" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Draw" withSorting />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "drawDate",
      meta: { label: "Date" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Date" withSorting />
      ),
    },
    {
      accessorKey: "ticketCount",
      meta: { label: "Tickets" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Tickets" withSorting />
      ),
      cell: ({ row }) => row.original.ticketCount.toLocaleString(),
    },
    {
      accessorKey: "prizePool",
      meta: { label: "Prize pool" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Prize pool" withSorting />
      ),
      cell: ({ row }) => formatCurrency(row.original.prizePool),
    },
    {
      accessorKey: "status",
      meta: { label: "Status" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Status" withSorting />
      ),
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const draw = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Actions for ${draw.name}`}
                />
              }
            >
              <MoreHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => actions.onView(draw)}>
                  <EyeIcon />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => actions.onEdit(draw)}>
                  <PencilIcon />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => actions.onDelete(draw)}
                >
                  <Trash2Icon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
