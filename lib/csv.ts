export type CsvCellValue = string | number | boolean | null | undefined | Date

export type CsvColumn<T> = {
  header: string
  accessor: (row: T) => CsvCellValue
}

function escapeCsvCell(value: CsvCellValue): string {
  if (value == null) return ""

  const raw =
    value instanceof Date
      ? value.toISOString()
      : typeof value === "boolean"
        ? value
          ? "true"
          : "false"
        : String(value)

  if (/[",\n\r]/.test(raw)) {
    return `"${raw.replaceAll('"', '""')}"`
  }

  return raw
}

/** Build a CSV string from rows + column definitions. */
export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((column) => escapeCsvCell(column.header)).join(",")
  const body = rows.map((row) =>
    columns.map((column) => escapeCsvCell(column.accessor(row))).join(",")
  )
  return [header, ...body].join("\n")
}

/** Trigger a browser download for a CSV string. */
export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  const safeName = filename.endsWith(".csv") ? filename : `${filename}.csv`

  link.href = url
  link.download = safeName
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

/** Convert rows to CSV and download in one step. */
export function downloadCsvFromRows<T>(
  filename: string,
  rows: T[],
  columns: CsvColumn<T>[]
) {
  downloadCsv(filename, toCsv(rows, columns))
}
