import { BellIcon, UserIcon } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { BrandLogo } from "@/components/shared/layout/BrandLogo"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="relative container mx-auto mt-4 rounded-lg bg-white px-6 py-4 shadow-xl dark:border dark:border-border/40 dark:bg-background">
      <nav className="flex items-center justify-between gap-4">
        <BrandLogo height={28} priority />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="User">
            <UserIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <BellIcon className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
