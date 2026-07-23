import Navbar from "@/components/shared/layout/Navbar"
import Sidebar from "@/components/shared/layout/Sidebar"
import DashboardShell from "@/components/shared/layout/DashboardShell"
import TabBar from "@/components/shared/layout/TabBar"
import { RequireAuth } from "@/features/auth/components/require-auth"
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <main className="flex flex-col p-3 md:p-0">
        <Navbar />
        <section className="container mx-auto mt-2 grid h-[calc(80vh)] grid-cols-1 gap-4 md:h-[calc(85vh)] md:grid-cols-12">
          <Sidebar className="hidden md:col-span-2 md:block" />
          <DashboardShell className="col-span-10 p-4">{children}</DashboardShell>
        </section>
        <TabBar />
      </main>
    </RequireAuth>
  )
}
