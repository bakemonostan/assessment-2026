"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { DownloadIcon, Settings2Icon } from "lucide-react"
import * as React from "react"

import { downloadCsvFromRows } from "@/lib/csv"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import { DebouncedInput } from "./DebouncedInput"
import { EmptyTableState } from "./EmptyTableState"
import { TableSkeleton } from "./TableSkeleton"
import type {
  DataTableContentProps,
  DataTableContextValue,
  DataTableExportProps,
  DataTableFiltersProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableSearchProps,
} from "./types"

export type {
  DataTableContentProps,
  DataTableExportProps,
  DataTableFiltersProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableSearchProps,
  EmptyStateConfig,
} from "./types"

const DataTableContext =
  React.createContext<DataTableContextValue<unknown> | null>(null)

function useDataTableContext<TData>() {
  const context = React.useContext(DataTableContext)
  if (!context) {
    throw new Error(
      "DataTable compound components must be used within DataTable"
    )
  }
  return context as DataTableContextValue<TData>
}

/**
 * Compound data table built on TanStack Table + shadcn.
 *
 * Compose with `DataTable.Filters`, `DataTable.Search`, `DataTable.Content`,
 * and `DataTable.Pagination`. Row navigation is handled via `onRowClick`
 * (no built-in router coupling).
 *
 * @example
 * ```tsx
 * <DataTable columns={columns} data={draws}>
 *   <DrawTableToolbar status={status} onStatusChange={setStatus} />
 * </DataTable>
 * ```
 * Content and pagination render automatically.
 */
function DataTableRoot<TData, TValue>({
  columns,
  data,
  isLoading,
  isRowClickable = false,
  onRowClick,
  withCheckbox = false,
  onSelectionChange,
  selectedRows,
  getRowId,
  emptyStateConfig,
  children,
  manualFiltering = false,
  initialGlobalFilter = "",
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState(initialGlobalFilter)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  })

  React.useEffect(() => {
    setGlobalFilter(initialGlobalFilter)
  }, [initialGlobalFilter])

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }))
  }, [pageSize])

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [globalFilter, data])

  React.useEffect(() => {
    if (!getRowId || selectedRows === undefined) return
    if (selectedRows.length === 0) {
      setRowSelection({})
      return
    }
    const selection: RowSelectionState = {}
    for (const row of selectedRows) {
      selection[getRowId(row)] = true
    }
    setRowSelection(selection)
  }, [selectedRows, getRowId])

  const tableColumns = React.useMemo(() => {
    if (!withCheckbox) return columns

    const selectColumn: ColumnDef<TData, TValue> = {
      id: "select",
      header: ({ table }) => (
        <div data-checkbox>
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={
              table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected()
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div data-checkbox>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    }

    return [selectColumn, ...columns]
  }, [withCheckbox, columns])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
      pagination,
    },
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    manualFiltering,
    enableRowSelection: withCheckbox,
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(newSelection)

      if (onSelectionChange && getRowId) {
        onSelectionChange(data.filter((row) => newSelection[getRowId(row)]))
      }
    },
  })

  const contextValue: DataTableContextValue<TData> = {
    table,
    isLoading,
    isRowClickable,
    onRowClick,
    getRowId,
    emptyStateConfig,
    globalFilter,
    setGlobalFilter,
    tableColumns: tableColumns as ColumnDef<TData, unknown>[],
  }

  return (
    <DataTableContext.Provider
      value={contextValue as DataTableContextValue<unknown>}
    >
      <div className="flex flex-col gap-4">
        {children}
        <DataTableContent />
        <DataTablePagination />
      </div>
    </DataTableContext.Provider>
  )
}

/**
 * Debounced global search input wired to the table filter state.
 */
function DataTableSearch({
  placeholder = "Search...",
  onChange,
  width,
  className,
}: DataTableSearchProps) {
  const { globalFilter, setGlobalFilter } = useDataTableContext()

  return (
    <DebouncedInput
      onChange={(value) => {
        const searchValue = String(value)
        setGlobalFilter(searchValue)
        onChange?.(searchValue)
      }}
      placeholder={placeholder}
      type="text"
      value={globalFilter}
      style={width ? { width } : undefined}
      className={cn(
        "rounded-lg border pl-8 shadow-xs",
        !width && "max-w-sm",
        className
      )}
    />
  )
}

/**
 * Layout wrapper for search and filter controls above the table.
 */
function DataTableFilters({
  children,
  layout = "column",
  className,
}: DataTableFiltersProps) {
  return (
    <div
      className={cn(
        "flex",
        layout === "column" ? "flex-col gap-2" : "flex-row items-center gap-4",
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Renders the table grid, loading skeleton, or empty state.
 */
function DataTableContent({ className }: DataTableContentProps) {
  const {
    table,
    isLoading,
    isRowClickable,
    onRowClick,
    emptyStateConfig,
    tableColumns,
  } = useDataTableContext()

  const handleRowClick = (row: Row<unknown>, event?: React.MouseEvent) => {
    if (!isRowClickable || !onRowClick) return
    const target = event?.target as HTMLElement | undefined
    // Ignore checkbox / button / link / menu clicks inside the row
    if (
      target?.closest(
        "[data-checkbox], button, a, [role='menuitem'], [data-slot='dropdown-menu-trigger']"
      )
    ) {
      return
    }
    onRowClick(row.original)
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border/60 bg-card",
        className
      )}
    >
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="py-3 text-foreground">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={(event) => handleRowClick(row, event)}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "text-foreground",
                  isRowClickable && onRowClick && "cursor-pointer",
                  row.getIsSelected() && "bg-muted"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    style={{ width: cell.column.getSize() }}
                    key={cell.id}
                    className="py-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length}
                className="h-24 text-center"
              >
                <EmptyTableState
                  description={emptyStateConfig?.description}
                  title={emptyStateConfig?.title}
                  icon={emptyStateConfig?.icon}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * Pagination controls with prev/next and rows-per-page.
 * Uses the table's client page state by default.
 * Pass props to drive server-side pagination instead.
 */
function DataTablePagination({
  pageIndex: pageIndexProp,
  pageSize: pageSizeProp,
  pageCount: pageCountProp,
  totalRows,
  pageSizeOptions = [5, 10, 20, 50],
  onChange,
}: DataTablePaginationProps = {}) {
  const { table } = useDataTableContext()
  const tablePagination = table.getState().pagination

  const pageIndex = pageIndexProp ?? tablePagination.pageIndex
  const pageSize = pageSizeProp ?? tablePagination.pageSize
  const pageCount = pageCountProp ?? table.getPageCount()
  const canPrevious = pageIndex > 0
  const canNext = pageIndex < pageCount - 1

  const goTo = (nextIndex: number, nextSize = pageSize) => {
    if (onChange) {
      onChange({ pageIndex: nextIndex, pageSize: nextSize })
      return
    }
    if (nextSize !== pageSize) {
      table.setPageSize(nextSize)
    }
    table.setPageIndex(nextIndex)
  }

  return (
    <div className="flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {totalRows != null
          ? `${totalRows} result${totalRows === 1 ? "" : "s"}`
          : `Page ${pageIndex + 1} of ${Math.max(pageCount, 1)}`}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            Rows per page
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              if (value == null) return
              goTo(0, Number(value))
            }}
          >
            <SelectTrigger size="sm" className="w-18">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={!canPrevious}
                className={cn(!canPrevious && "pointer-events-none opacity-50")}
                onClick={(event) => {
                  event.preventDefault()
                  if (canPrevious) goTo(pageIndex - 1)
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={!canNext}
                className={cn(!canNext && "pointer-events-none opacity-50")}
                onClick={(event) => {
                  event.preventDefault()
                  if (canNext) goTo(pageIndex + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

/**
 * Toggle column visibility — use to unhide columns after header "Hide".
 */
function DataTableViewOptions() {
  const { table } = useDataTableContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="bg-muted! hover:bg-muted/80"
          />
        }
      >
        <Settings2Icon data-icon="inline-start" />
        Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              const label =
                (column.columnDef.meta as { label?: string } | undefined)
                  ?.label ?? column.id

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Download filtered (and sorted) rows as CSV — respects search/status filters,
 * not just the current page.
 */
function DataTableExport({
  filename = "export.csv",
  className,
}: DataTableExportProps) {
  const { table } = useDataTableContext()
  const filteredRows = table.getFilteredRowModel().rows

  function handleExport() {
    const exportColumns = table
      .getVisibleLeafColumns()
      .filter(
        (column) =>
          column.id !== "select" &&
          column.id !== "actions" &&
          typeof column.accessorFn !== "undefined"
      )

    if (exportColumns.length === 0) return

    downloadCsvFromRows(
      filename,
      filteredRows,
      exportColumns.map((column) => ({
        header:
          (column.columnDef.meta as { label?: string } | undefined)?.label ??
          column.id,
        accessor: (row) => {
          const value = row.getValue(column.id)
          if (value == null) return ""
          if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
          ) {
            return value
          }
          if (value instanceof Date) return value
          return String(value)
        },
      }))
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("bg-muted! hover:bg-muted/80", className)}
      onClick={handleExport}
      disabled={filteredRows.length === 0}
    >
      <DownloadIcon data-icon="inline-start" />
      Export CSV
    </Button>
  )
}

export const DataTable = Object.assign(DataTableRoot, {
  Search: DataTableSearch,
  Filters: DataTableFilters,
  Content: DataTableContent,
  Pagination: DataTablePagination,
  ViewOptions: DataTableViewOptions,
  Export: DataTableExport,
})
