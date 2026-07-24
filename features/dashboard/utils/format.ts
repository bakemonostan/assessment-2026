/** Format a number as NGN currency (no decimals). */
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value)
}

/** Format a number with `en-NG` grouping. */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-NG").format(value)
}
