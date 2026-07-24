import { MapPinIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WinnerDetail } from "@/features/winners/types/winner"

import { InfoRow } from "./info-row"

type WinnerPersonalInfoCardProps = {
  winner: WinnerDetail
}

export function WinnerPersonalInfoCard({ winner }: WinnerPersonalInfoCardProps) {
  return (
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
  )
}
