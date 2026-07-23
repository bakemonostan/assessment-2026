import { NextResponse } from "next/server"

import { dashboardStore } from "@/mocks/data/dashboard-store"

export async function GET(request: Request) {
  const url = new URL(request.url)

  if (url.searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "Failed to load dashboard" },
      { status: 500 }
    )
  }

  return NextResponse.json({ data: dashboardStore })
}
