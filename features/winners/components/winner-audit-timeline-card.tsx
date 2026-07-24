import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WinnerDetail } from "@/features/winners/types/winner"
import { formatDateTime } from "@/features/winners/utils/format"

type WinnerAuditTimelineCardProps = {
  winner: WinnerDetail
}

export function WinnerAuditTimelineCard({ winner }: WinnerAuditTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Timeline</CardTitle>
        <CardDescription>
          Chronological record of verification and payout actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {winner.auditTimeline.length === 0 ? (
          <p className="text-sm text-muted-foreground">No audit events yet.</p>
        ) : (
          <ol className="relative space-y-0 border-l border-border/80 pl-5">
            {[...winner.auditTimeline]
              .sort(
                (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
              )
              .map((event) => (
                <li key={event.id} className="relative pb-6 last:pb-0">
                  <span className="absolute top-1.5 left-[-1.4rem] size-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium">{event.title}</p>
                      <time
                        dateTime={event.at}
                        className="text-xs text-muted-foreground"
                      >
                        {formatDateTime(event.at)}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.actor}
                    </p>
                  </div>
                </li>
              ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
