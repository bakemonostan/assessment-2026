import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  href?: string
  className?: string
  /** Display height in px */
  height?: number
  priority?: boolean
}

export function BrandLogo({
  href = "/",
  className,
  height = 32,
  priority = false,
}: BrandLogoProps) {
  // Intrinsic ratio ≈ 4.6:1 from the wordmark asset
  const width = Math.round(height * 4.6)

  const mark = (
    <span className="relative inline-flex shrink-0">
      <Image
        src="/techbox-logo.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        className={cn("object-contain object-left dark:hidden", className)}
        style={{ width: "auto", height }}
        priority={priority}
      />
      <Image
        src="/techbox-logo-dark.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        className={cn("hidden object-contain object-left dark:block", className)}
        style={{ width: "auto", height }}
        priority={priority}
      />
    </span>
  )

  if (!href) {
    return (
      <span role="img" aria-label="TechBox — Innovation that works">
        {mark}
      </span>
    )
  }

  return (
    <Link href={href} className="inline-flex shrink-0" aria-label="TechBox home">
      {mark}
    </Link>
  )
}
