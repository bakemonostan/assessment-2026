/**
 * Re-exports for the original demo table.
 * Canonical draw types live in `@/features/draws`.
 */
export type { Draw as DemoDraw, DrawStatus } from "@/features/draws/types/draw"
export { STATUS_VARIANT } from "@/features/draws/types/draw"
export { formatCurrency } from "@/features/draws/utils/format"
export { MOCK_DRAWS } from "@/mocks/data/draws-seed"
