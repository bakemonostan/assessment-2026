"use client"

import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import type { ColumnHeaderProps } from "./types"

export type { ColumnHeaderProps } from "./types"

/**
 * Table column header with optional sort / visibility menu (Base UI dropdown).
 *
 * @example
 * ```tsx
 * {
 *   accessorKey: "name",
 *   header: ({ column }) => (
 *     <ColumnHeader column={column} title="Name" withSorting />
 *   ),
 * }
 * ```
 */
export function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
  withSorting = false,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() || !withSorting) {
    return <div className={cn("font-medium", className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-popup-open:bg-accent"
            />
          }
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUp className="text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDown className="text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator />
          {withVisibility && (
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="text-muted-foreground/70" />
                Hide
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
