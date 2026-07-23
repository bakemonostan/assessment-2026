import { cn } from "@/lib/utils"
import React from "react"

export default function DashboardShell({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "thin-scrollbar min-h-0 overflow-y-auto rounded-lg bg-white dark:border dark:border-border/40 dark:bg-background dark:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  )
}
