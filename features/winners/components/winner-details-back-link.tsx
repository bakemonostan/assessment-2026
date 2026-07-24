import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type WinnerDetailsBackLinkProps = {
  className?: string
}

export function WinnerDetailsBackLink({ className }: WinnerDetailsBackLinkProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(className)}
      nativeButton={false}
      render={<Link href="/winners" />}
    >
      <ArrowLeftIcon data-icon="inline-start" />
      Back to winners
    </Button>
  )
}
