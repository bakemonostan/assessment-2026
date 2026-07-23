import { NextResponse } from "next/server"

import {
  toWinnerListItem,
  winnersStore,
} from "@/mocks/data/winners-store"

export async function GET(request: Request) {
  const url = new URL(request.url)

  if (url.searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "Failed to load winners" },
      { status: 500 }
    )
  }

  const paymentStatus = url.searchParams.get("paymentStatus")
  const filtered =
    !paymentStatus || paymentStatus === "all"
      ? winnersStore
      : winnersStore.filter((winner) => winner.paymentStatus === paymentStatus)

  return NextResponse.json({ data: filtered.map(toWinnerListItem) })
}
