import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WinnerDetail } from "@/features/winners/types/winner"
import { formatCurrency } from "@/features/winners/utils/format"

type WinnerPrizeCardProps = {
  winner: WinnerDetail
}

export function WinnerPrizeCard({ winner }: WinnerPrizeCardProps) {
  return (
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
  )
}
