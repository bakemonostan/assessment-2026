import type { ReactNode } from "react"

import { ModeToggle } from "@/components/mode-toggle"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background px-4 py-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
