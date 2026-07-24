import { TicketIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WinnerDetail } from "@/features/winners/types/winner"
import { formatDate, formatDateTime } from "@/features/winners/utils/format"

import { InfoRow } from "./info-row"

type WinnerTicketCardProps = {
  winner: WinnerDetail
}

export function WinnerTicketCard({ winner }: WinnerTicketCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Winning Ticket</CardTitle>
        <CardDescription>Draw and ticket metadata</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 text-sm">
          <InfoRow
            label="Ticket number"
            value={
              <span className="inline-flex items-center gap-1.5 font-mono">
                <TicketIcon className="size-3.5 text-muted-foreground" />
                {winner.ticketNumber}
              </span>
            }
          />
          <InfoRow label="Draw" value={winner.draw} />
          <InfoRow label="Draw date" value={formatDate(winner.drawDate)} />
          <InfoRow
            label="Purchased"
            value={formatDateTime(winner.ticketPurchasedAt)}
          />
        </dl>
      </CardContent>
    </Card>
  )
}
