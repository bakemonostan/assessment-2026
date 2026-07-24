"use client"

import { useWinnerQuery } from "@/features/winners/hooks/queries"
import { getErrorMessage } from "@/lib/api/api.utils"

import { WinnerDetailSkeleton } from "./winner-detail-skeleton"
import { WinnerDetailsBackLink } from "./winner-details-back-link"
import { WinnerDetailsContent } from "./winner-details-content"

type WinnerDetailsPageProps = {
  winnerId: string
}

export function WinnerDetailsPage({ winnerId }: WinnerDetailsPageProps) {
  const winnerQuery = useWinnerQuery(winnerId)

  if (winnerQuery.isLoading) {
    return <WinnerDetailSkeleton />
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
        <WinnerDetailsBackLink className="w-fit" />
      </div>
    )
  }

  if (!winnerQuery.data) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Winner not found.</p>
        <WinnerDetailsBackLink className="w-fit" />
      </div>
    )
  }

  return <WinnerDetailsContent winner={winnerQuery.data} />
}
