import type { Participant } from "@/features/participants/types/participant"
import { MOCK_PARTICIPANTS } from "@/mocks/data/participants-seed"

/** Mutable in-memory store used by API routes / MSW handlers. */
export const participantsStore: Participant[] = structuredClone(MOCK_PARTICIPANTS)
