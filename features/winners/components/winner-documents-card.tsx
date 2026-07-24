import { FileTextIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WinnerDetail } from "@/features/winners/types/winner"
import { formatDateTime } from "@/features/winners/utils/format"

type WinnerDocumentsCardProps = {
  winner: WinnerDetail
}

export function WinnerDocumentsCard({ winner }: WinnerDocumentsCardProps) {
  return (
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
  )
}
