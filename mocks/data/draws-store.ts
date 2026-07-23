import type { Draw } from "@/features/draws/types/draw"
import { MOCK_DRAWS } from "@/mocks/data/draws-seed"

/** Mutable in-memory store used by API routes / MSW handlers. */
export const drawsStore: Draw[] = structuredClone(MOCK_DRAWS)
