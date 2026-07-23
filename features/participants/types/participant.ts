export type ParticipantStatus = "active" | "inactive" | "suspended"

export type Participant = {
  id: string
  name: string
  email: string
  phone: string
  ticketsPurchased: number
  totalSpend: number
  status: ParticipantStatus
}

export const STATUS_VARIANT: Record<
  ParticipantStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  active: "default",
  inactive: "secondary",
  suspended: "destructive",
}

export const PARTICIPANT_STATUS_OPTIONS: {
  label: string
  value: ParticipantStatus | "all"
}[] = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
]
