import { NextResponse } from "next/server"

import { drawsStore } from "@/mocks/data/draws-store"

export async function GET(request: Request) {
  const url = new URL(request.url)

  if (url.searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "Failed to load draws" },
      { status: 500 }
    )
  }

  const status = url.searchParams.get("status")
  const data =
    !status || status === "all"
      ? drawsStore
      : drawsStore.filter((draw) => draw.status === status)

  return NextResponse.json({ data })
}
