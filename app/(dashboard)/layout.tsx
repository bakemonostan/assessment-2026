import Navbar from "@/components/shared/layout/Navbar"
import Sidebar from "@/components/shared/layout/Sidebar"
import DashboardShell from "@/components/shared/layout/DashboardShell"
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="container mx-auto mt-2 grid h-[calc(85vh)] grid-cols-1 gap-4 p-1 md:grid-cols-12">
        {/* sidebar */}
        <Sidebar className="col-span-2 hidden md:block" />
        <DashboardShell className="col-span-10 p-4">{children}</DashboardShell>
      </section>
    </main>
  )
}
