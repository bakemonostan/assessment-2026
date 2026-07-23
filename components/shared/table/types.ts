import type { Column, ColumnDef, Table as TanstackTable } from "@tanstack/react-table"
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react"

/**
 * Empty-state copy and icon shown when the table has no rows.
 */
export interface EmptyStateConfig {
  title?: string
  description?: string
  icon?: ReactNode
}

/**
 * Shared context value for {@link DataTable} compound components.
 */
export interface DataTableContextValue<TData> {
  table: TanstackTable<TData>
  isLoading?: boolean
  isRowClickable?: boolean
  onRowClick?: (row: TData) => void
  getRowId?: (row: TData) => string
  emptyStateConfig?: EmptyStateConfig
  globalFilter: string
  setGlobalFilter: (value: string) => void
  tableColumns: ColumnDef<TData, unknown>[]
}

/**
 * Props for the root {@link DataTable} provider.
 *
 * @example
 * ```tsx
 * <DataTable columns={columns} data={draws} isLoading={isLoading} onRowClick={goToDraw}>
 *   <DataTable.Filters>
 *     <DataTable.Search placeholder="Search draws..." />
 *   </DataTable.Filters>
 *   <DataTable.Content />
 *   <DataTable.Pagination
 *     pageIndex={page}
 *     pageSize={10}
 *     pageCount={pageCount}
 *     onChange={({ pageIndex }) => setPage(pageIndex)}
 *   />
 * </DataTable>
 * ```
 */
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  /** When true, rows show a pointer and call `onRowClick`. @default false */
  isRowClickable?: boolean
  onRowClick?: (row: TData) => void
  /** Prepend a selection checkbox column. @default false */
  withCheckbox?: boolean
  onSelectionChange?: (selectedRows: TData[]) => void
  /** Controlled selection; requires `getRowId`. */
  selectedRows?: TData[]
  getRowId?: (row: TData) => string
  emptyStateConfig?: EmptyStateConfig
  children?: ReactNode
  /** Server-side filtering; skips client globalFilter. @default false */
  manualFiltering?: boolean
  /** Seed / sync the search input (e.g. from URL). @default `""` */
  initialGlobalFilter?: string
  /** Rows per page for client-side pagination. @default 10 */
  pageSize?: number
}

/**
 * Props for {@link DataTable}.Search.
 */
export interface DataTableSearchProps {
  placeholder?: string
  /** Fires after debounce in addition to updating table global filter. */
  onChange?: (value: string) => void
  width?: string
  className?: string
}

/**
 * Props for {@link DataTable}.Filters toolbar wrapper.
 */
export interface DataTableFiltersProps {
  children: ReactNode
  layout?: "row" | "column"
  className?: string
}

/**
 * Props for {@link DataTable}.Content (the table grid).
 */
export interface DataTableContentProps {
  className?: string
}

/**
 * Props for {@link DataTable}.Export (CSV download of filtered rows).
 */
export interface DataTableExportProps {
  /** Download filename. `.csv` is appended when missing. @default `"export.csv"` */
  filename?: string
  className?: string
}

/**
 * Pagination controls. Omit props to use the table's client-side page state.
 * Pass props for server-driven pagination.
 */
export interface DataTablePaginationProps {
  pageIndex?: number
  pageSize?: number
  pageCount?: number
  totalRows?: number
  /** Options for the rows-per-page select. @default `[5, 10, 20, 50]` */
  pageSizeOptions?: number[]
  onChange?: (pagination: { pageIndex: number; pageSize: number }) => void
}

/**
 * Props for {@link ColumnHeader}.
 */
export interface ColumnHeaderProps<
  TData,
  TValue,
> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  /** Show sort / hide dropdown. @default false */
  withSorting?: boolean
  /** Show visibility dropdown. @default false */
  withVisibility?: boolean
}

/**
 * Props for {@link EmptyTableState}.
 */
export interface EmptyTableStateProps {
  searchQuery?: string
  onReset?: () => void
  onClearFilters?: () => void
  title?: string
  description?: string
  icon?: ReactNode
}

/**
 * Props for {@link DebouncedInput}.
 */
export interface DebouncedInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number
  onChange: (value: string | number) => void
  /** Delay in ms before calling `onChange`. @default 500 */
  debounce?: number
  inputClassName?: string
}

/**
 * Props for {@link TableSkeleton}.
 */
export interface TableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  className?: string
}
