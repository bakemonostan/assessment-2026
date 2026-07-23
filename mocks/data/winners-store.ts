import type { WinnerDetail } from "@/features/winners/types/winner"
import { MOCK_WINNERS } from "@/mocks/data/winners-seed"

/** Mutable in-memory store used by API routes / MSW handlers. */
export const winnersStore: WinnerDetail[] = structuredClone(MOCK_WINNERS)

export function toWinnerListItem(winner: WinnerDetail) {
  const {
    id,
    name,
    email,
    phone,
    ticketNumber,
    draw,
    prize,
    paymentStatus,
    verificationStatus,
  } = winner

  return {
    id,
    name,
    email,
    phone,
    ticketNumber,
    draw,
    prize,
    paymentStatus,
    verificationStatus,
  }
}
