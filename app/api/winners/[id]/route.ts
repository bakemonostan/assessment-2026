import { NextResponse } from "next/server"

import { winnersStore } from "@/mocks/data/winners-store"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const winner = winnersStore.find((item) => item.id === id)

  if (!winner) {
    return NextResponse.json({ message: "Winner not found" }, { status: 404 })
  }

  return NextResponse.json({ data: winner })
}
