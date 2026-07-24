import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  PAYMENT_STATUS_VARIANT,
  VERIFICATION_STATUS_VARIANT,
  type WinnerDetail,
} from "@/features/winners/types/winner"

import { InfoRow } from "./info-row"

type WinnerPaymentVerificationCardProps = {
  winner: WinnerDetail
}

export function WinnerPaymentVerificationCard({
  winner,
}: WinnerPaymentVerificationCardProps) {
  return (
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
  )
}
