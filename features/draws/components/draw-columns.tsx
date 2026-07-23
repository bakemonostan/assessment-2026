"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {
  BanIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
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
  STATUS_VARIANT,
  canCancelDraw,
  type Draw,
} from "@/features/draws/types/draw"
import { formatCurrency } from "@/features/draws/utils/format"

type Actions = {
  onView: (draw: Draw) => void
  onEdit: (draw: Draw) => void
  onCancel: (draw: Draw) => void
}

export function getDrawColumns(actions: Actions): ColumnDef<Draw>[] {
  return [
    {
      accessorKey: "name",
      meta: { label: "Draw Name" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Draw Name" withSorting />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "drawDate",
      meta: { label: "Draw Date" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Draw Date" withSorting />
      ),
    },
    {
      accessorKey: "ticketCount",
      meta: { label: "Ticket Count" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Ticket Count" withSorting />
      ),
      cell: ({ row }) => row.original.ticketCount.toLocaleString(),
    },
    {
      accessorKey: "prizePool",
      meta: { label: "Prize Pool" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="Prize Pool" withSorting />
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
        <Badge
          variant={STATUS_VARIANT[row.original.status]}
          className="capitalize"
        >
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
        const cancellable = canCancelDraw(draw.status)

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
              {cancellable ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => actions.onCancel(draw)}
                    >
                      <BanIcon />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
