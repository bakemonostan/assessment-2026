export type PaymentStatus = "unpaid" | "processing" | "paid" | "failed"
export type VerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "rejected"

export type AuditEvent = {
  id: string
  at: string
  title: string
  description: string
  actor: string
}

export type SupportingDocument = {
  id: string
  name: string
  type: string
  uploadedAt: string
}

/** List-row shape for the winners table. */
export type Winner = {
  id: string
  name: string
  email: string
  phone: string
  ticketNumber: string
  draw: string
  prize: number
  paymentStatus: PaymentStatus
  verificationStatus: VerificationStatus
}

/** Full detail payload for `/winners/[id]`. */
export type WinnerDetail = Winner & {
  address: string
  drawDate: string
  ticketPurchasedAt: string
  auditTimeline: AuditEvent[]
  documents: SupportingDocument[]
}

export const PAYMENT_STATUS_VARIANT: Record<
  PaymentStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  unpaid: "secondary",
  processing: "default",
  paid: "outline",
  failed: "destructive",
}

export const VERIFICATION_STATUS_VARIANT: Record<
  VerificationStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  unverified: "secondary",
  pending: "default",
  verified: "outline",
  rejected: "destructive",
}

export const PAYMENT_STATUS_OPTIONS: {
  label: string
  value: PaymentStatus | "all"
}[] = [
  { label: "All payments", value: "all" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
  { label: "Failed", value: "failed" },
]
