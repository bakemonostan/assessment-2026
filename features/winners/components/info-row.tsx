import type { ReactNode } from "react"

type InfoRowProps = {
  label: string
  value: ReactNode
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium sm:text-right">{value}</dd>
    </div>
  )
}
