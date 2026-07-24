import type { WinnerDetail } from "@/features/winners/types/winner"

import { WinnerAuditTimelineCard } from "./winner-audit-timeline-card"
import { WinnerDetailsHeader } from "./winner-details-header"
import { WinnerDocumentsCard } from "./winner-documents-card"
import { WinnerPaymentVerificationCard } from "./winner-payment-verification-card"
import { WinnerPersonalInfoCard } from "./winner-personal-info-card"
import { WinnerPrizeCard } from "./winner-prize-card"
import { WinnerTicketCard } from "./winner-ticket-card"

type WinnerDetailsContentProps = {
  winner: WinnerDetail
}

export function WinnerDetailsContent({ winner }: WinnerDetailsContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <WinnerDetailsHeader winner={winner} />

      <div className="grid gap-4 lg:grid-cols-2">
        <WinnerPersonalInfoCard winner={winner} />
        <WinnerTicketCard winner={winner} />
        <WinnerPrizeCard winner={winner} />
        <WinnerPaymentVerificationCard winner={winner} />
      </div>

      <WinnerAuditTimelineCard winner={winner} />
      <WinnerDocumentsCard winner={winner} />
    </div>
  )
}
