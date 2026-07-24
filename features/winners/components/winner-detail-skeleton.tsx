import { Skeleton } from "@/components/ui/skeleton"

export function WinnerDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-40 md:col-span-2" />
      </div>
    </div>
  )
}
