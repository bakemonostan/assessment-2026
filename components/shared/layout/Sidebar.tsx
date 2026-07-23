import { cn } from "@/lib/utils"
import React from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-4 dark:border dark:border-border/40 dark:bg-background dark:shadow-xl",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <p className="shimmer text-lg font-semibold tracking-wide text-primary uppercase">
          TechBox
        </p>
      </div>
    </div>
  )
}
