import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import type { TableSkeletonProps } from "./types"

export type { TableSkeletonProps } from "./types"

/**
 * Loading placeholder that mirrors a table layout.
 *
 * @example
 * ```tsx
 * {isLoading ? <TableSkeleton rows={8} columns={5} /> : <DataTable.Content />}
 * ```
 */
export function TableSkeleton({
  rows = 8,
  columns = 4,
  showHeader = true,
  className,
}: TableSkeletonProps) {
  const skeletonRows = Array.from({ length: rows }, (_, index) => index)
  const skeletonCols = Array.from({ length: columns }, (_, index) => index)

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-md border bg-card",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {showHeader ? (
            <thead>
              <tr className="border-b bg-muted/40 dark:bg-muted/60">
                {skeletonCols.map((col) => (
                  <th key={`header-${col}`} className="px-6 py-4 text-left">
                    <Skeleton className="h-3.5 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {skeletonRows.map((row) => (
              <tr key={`row-${row}`} className="border-b last:border-0">
                {skeletonCols.map((col) => (
                  <td key={`cell-${row}-${col}`} className="px-6 py-4">
                    <Skeleton
                      className="h-4"
                      style={{ width: `${60 + ((row + col) % 4) * 10}%` }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
