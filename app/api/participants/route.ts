import { NextResponse } from "next/server"

import { participantsStore } from "@/mocks/data/participants-store"

export async function GET(request: Request) {
  const url = new URL(request.url)

  if (url.searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "Failed to load participants" },
      { status: 500 }
    )
  }

  const status = url.searchParams.get("status")
  const data =
    !status || status === "all"
      ? participantsStore
      : participantsStore.filter((participant) => participant.status === status)

  return NextResponse.json({ data })
}
