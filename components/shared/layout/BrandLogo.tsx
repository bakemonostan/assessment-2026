import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  href?: string
  className?: string
  /** Image height in px */
  height?: number
  priority?: boolean
}

/**
 * TechBox wordmark. Dark navy in the asset needs a light plate in dark mode.
 */
export function BrandLogo({
  href = "/",
  className,
  height = 32,
  priority = false,
}: BrandLogoProps) {
  const width = Math.round(height * (220 / 48))

  const mark = (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-white px-2 py-1 ring-1 ring-border/40",
        className
      )}
    >
      <Image
        src="/techbox-logo.png"
        alt="TechBox — Innovation that works"
        width={width}
        height={height}
        className="h-auto w-auto"
        style={{ height, width: "auto" }}
        priority={priority}
      />
    </span>
  )

  if (!href) return mark

  return (
    <Link href={href} className="inline-flex shrink-0" aria-label="TechBox home">
      {mark}
    </Link>
  )
}
