"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowLeftIcon,
  FileTextIcon,
  MapPinIcon,
  TicketIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWinnerQuery } from "@/features/winners/hooks/queries"
import {
  PAYMENT_STATUS_VARIANT,
  VERIFICATION_STATUS_VARIANT,
  type WinnerDetail,
} from "@/features/winners/types/winner"
import {
  formatCurrency,
  formatDate,
  formatDateTime,
} from "@/features/winners/utils/format"
import { getErrorMessage } from "@/lib/api/api.utils"

type WinnerDetailsPageProps = {
  winnerId: string
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-40 md:col-span-2" />
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium sm:text-right">{value}</dd>
    </div>
  )
}

function WinnerDetailsContent({ winner }: { winner: WinnerDetail }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">
              {winner.name}
            </h1>
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
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/winners" />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Back to winners
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
            <CardDescription>Contact and location details</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm">
              <InfoRow label="Full name" value={winner.name} />
              <InfoRow label="Email" value={winner.email} />
              <InfoRow label="Phone" value={winner.phone} />
              <InfoRow
                label="Address"
                value={
                  <span className="inline-flex items-start gap-1.5 sm:justify-end">
                    <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    {winner.address}
                  </span>
                }
              />
            </dl>
          </CardContent>
        </Card>

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

        <Card>
          <CardHeader>
            <CardTitle>Prize Amount</CardTitle>
            <CardDescription>Award value for this win</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">
              {formatCurrency(winner.prize)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment & Verification</CardTitle>
            <CardDescription>Current processing state</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm">
              <InfoRow
                label="Payment status"
                value={
                  <Badge
                    variant={PAYMENT_STATUS_VARIANT[winner.paymentStatus]}
                    className="capitalize"
                  >
                    {winner.paymentStatus}
                  </Badge>
                }
              />
              <InfoRow
                label="Verification status"
                value={
                  <Badge
                    variant={
                      VERIFICATION_STATUS_VARIANT[winner.verificationStatus]
                    }
                    className="capitalize"
                  >
                    {winner.verificationStatus}
                  </Badge>
                }
              />
            </dl>
          </CardContent>
        </Card>
      </div>

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
                    <span className="absolute top-1.5 -left-[1.4rem] size-2.5 rounded-full bg-primary ring-4 ring-background" />
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

      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <CardDescription>
            Files submitted for identity and payout verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {winner.documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No documents uploaded yet.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {winner.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <FileTextIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} · uploaded {formatDateTime(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{doc.type}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function WinnerDetailsPage({ winnerId }: WinnerDetailsPageProps) {
  const winnerQuery = useWinnerQuery(winnerId)

  if (winnerQuery.isLoading) {
    return <DetailSkeleton />
  }

  if (winnerQuery.isError) {
    return (
      <div className="flex flex-col gap-4">
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {getErrorMessage(winnerQuery.error)}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          nativeButton={false}
          render={<Link href="/winners" />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Back to winners
        </Button>
      </div>
    )
  }

  if (!winnerQuery.data) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Winner not found.</p>
        <Button
          variant="outline"
          size="sm"
          className="w-fit"
          nativeButton={false}
          render={<Link href="/winners" />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Back to winners
        </Button>
      </div>
    )
  }

  return <WinnerDetailsContent winner={winnerQuery.data} />
}
