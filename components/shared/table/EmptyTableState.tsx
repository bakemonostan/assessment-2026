"use client"

import { BoxIcon, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { EmptyTableStateProps } from "./types"

export type { EmptyTableStateProps } from "./types"

/**
 * Empty / no-results state for tables and list views.
 *
 * @example
 * ```tsx
 * <EmptyTableState
 *   title="No draws found"
 *   description="Create a draw or adjust your filters."
 *   searchQuery={query}
 *   onReset={() => setQuery("")}
 *   onClearFilters={clearFilters}
 * />
 * ```
 */
export function EmptyTableState({
  searchQuery,
  onReset,
  onClearFilters,
  title = "No results found",
  description = "We couldn't find what you're looking for",
  icon = <BoxIcon className="size-10 text-primary" strokeWidth={1.5} />,
}: EmptyTableStateProps) {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-2xl" />
          <div className="relative inline-flex size-16 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
            {icon}
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-medium tracking-tight text-muted-foreground">
          {title}
        </h2>
        {searchQuery ? (
          <p className="mb-2 text-sm text-muted-foreground">
            No matches for{" "}
            <span className="font-medium text-foreground">
              &quot;{searchQuery}&quot;
            </span>
          </p>
        ) : null}
        <p className="mb-8 text-balance leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onReset ? (
            <Button onClick={onReset} variant="default">
              <RotateCcw data-icon="inline-start" />
              Reset search
            </Button>
          ) : null}
          {onClearFilters ? (
            <Button onClick={onClearFilters} variant="outline">
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
