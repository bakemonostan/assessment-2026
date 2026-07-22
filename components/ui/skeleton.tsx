import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        // foreground/alpha stays visible on muted, card, and background in both themes
        "relative isolate overflow-hidden rounded-md bg-foreground/10",
        "after:absolute after:inset-0 after:animate-skeleton-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-foreground/20 after:to-transparent",
        "motion-reduce:after:animate-none motion-reduce:animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
