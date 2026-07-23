"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { SIDEBAR_NAV } from "@/components/shared/layout/content"
import { getAuthSession } from "@/features/auth/utils/session"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function TabBar() {
  const pathname = usePathname()
  const role = getAuthSession()?.role

  const items = useMemo(
    () =>
      SIDEBAR_NAV.filter(
        (item) => !item.roles || (role && item.roles.includes(role))
      ),
    [role]
  )

  return (
    <footer className="container mx-auto mt-2 rounded-lg bg-white px-4 py-3 shadow-xl md:hidden dark:border dark:border-border/40 dark:bg-background">
      <nav aria-label="Mobile navigation">
        <ul
          className={cn(
            "grid gap-1",
            items.length <= 3 ? "grid-cols-3" : "grid-cols-4"
          )}
        >
          {items.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-md px-2 py-1.5 text-[11px] transition-colors",
                    active
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </footer>
  )
}
