"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import { useMemo } from "react"
import { toast } from "sonner"

import { SIDEBAR_NAV } from "@/components/shared/layout/content"
import { Button } from "@/components/ui/button"
import { clearAuthSession, getAuthSession } from "@/features/auth/utils/session"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const session = getAuthSession()
  const role = session?.role

  const items = useMemo(
    () =>
      SIDEBAR_NAV.filter(
        (item) => !item.roles || (role && item.roles.includes(role))
      ),
    [role]
  )

  function handleLogout() {
    clearAuthSession()
    toast.success("Signed out")
    router.push("/login")
  }

  return (
    <aside
      className={cn(
        "flex flex-col justify-between rounded-lg bg-card p-3 shadow-sm ring-1 ring-border/60 dark:bg-background dark:shadow-xl",
        className
      )}
      {...props}
    >
      <div
        className="flex h-full flex-col justify-between gap-4"
        aria-label="Main"
      >
        <div className="flex flex-col items-center gap-5 lg:items-stretch">
          {items.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-3 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="hidden text-sm lg:block">{label}</span>
              </Link>
            )
          })}
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-border/60 pt-2 pb-4">
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start gap-2.5 p-0 text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOutIcon className="size-5 shrink-0" aria-hidden />
            Log out
          </Button>
          {session ? (
            <p className="truncate text-xs text-muted-foreground">
              {session.email}
              <span className="block capitalize">{session.role}</span>
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
