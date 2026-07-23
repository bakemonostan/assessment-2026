import { ModeToggle } from "@/components/mode-toggle"
import React from "react"

export default function Navbar() {
  return (
    <header className="relative container mx-auto mt-4 rounded-lg bg-white px-6 py-4 shadow-xl dark:border dark:border-border/40 dark:bg-background">
      <nav>
        <ModeToggle />
        {/* switch between light and dark mode */}
      </nav>
    </header>
  )
}
