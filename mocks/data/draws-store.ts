import type { DemoDraw } from "@/components/demo-table/data"
import { MOCK_DRAWS } from "@/components/demo-table/data"

/** Mutable in-memory store used by MSW handlers. */
export const drawsStore: DemoDraw[] = structuredClone(MOCK_DRAWS)
