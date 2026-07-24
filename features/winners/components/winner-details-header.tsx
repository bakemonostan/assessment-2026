import { Badge } from "@/components/ui/badge"
import {
  PAYMENT_STATUS_VARIANT,
  VERIFICATION_STATUS_VARIANT,
  type WinnerDetail,
} from "@/features/winners/types/winner"

import { WinnerDetailsBackLink } from "./winner-details-back-link"

type WinnerDetailsHeaderProps = {
  winner: WinnerDetail
}

export function WinnerDetailsHeader({ winner }: WinnerDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">{winner.name}</h1>
          <Badge
            variant={VERIFICATION_STATUS_VARIANT[winner.verificationStatus]}
            className="capitalize"
          >
            {winner.verificationStatus}
          </Badge>
          <Badge
            variant={PAYMENT_STATUS_VARIANT[winner.paymentStatus]}
            className="capitalize"
          >
            {winner.paymentStatus}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Winner details for ticket{" "}
          <span className="font-mono">{winner.ticketNumber}</span>
        </p>
      </div>
      <WinnerDetailsBackLink />
    </div>
  )
}
