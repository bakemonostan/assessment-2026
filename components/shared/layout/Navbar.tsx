"use client"

import { useRouter } from "next/navigation"
import { BellIcon, LogOutIcon, UserIcon } from "lucide-react"
import { toast } from "sonner"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearAuthSession, getAuthSession } from "@/features/auth/utils/session"

export default function Navbar() {
  const router = useRouter()
  const session = getAuthSession()

  function handleLogout() {
    clearAuthSession()
    toast.success("Signed out")
    router.push("/login")
  }

  return (
    <header className="relative container mx-auto mt-4 rounded-lg bg-white px-6 py-4 shadow-xl dark:border dark:border-border/40 dark:bg-background">
      <nav className="flex items-center justify-between gap-4">
        <p className="shimmer text-xl font-semibold tracking-wider text-primary uppercase">
          TechBox
        </p>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Account menu"
                />
              }
            >
              <UserIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  {session ? (
                    <span className="flex flex-col gap-0.5">
                      <span className="truncate text-sm font-medium text-foreground">
                        {session.email}
                      </span>
                      <span className="text-xs capitalize text-muted-foreground">
                        {session.role}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not signed in
                    </span>
                  )}
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <BellIcon className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
