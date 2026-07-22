import { NextResponse } from "next/server"

import { drawsStore } from "@/mocks/data/draws-store"

type UpdateDrawBody = {
  name?: string
}

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const draw = drawsStore.find((item) => item.id === id)

  if (!draw) {
    return NextResponse.json({ message: "Draw not found" }, { status: 404 })
  }

  return NextResponse.json({ data: draw })
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params
  const index = drawsStore.findIndex((item) => item.id === id)

  if (index === -1) {
    return NextResponse.json({ message: "Draw not found" }, { status: 404 })
  }

  const body = (await request.json()) as UpdateDrawBody
  const current = drawsStore[index]
  const updated = {
    ...current,
    name: body.name?.trim() || current.name,
  }
  drawsStore[index] = updated

  return NextResponse.json({ data: updated })
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const index = drawsStore.findIndex((item) => item.id === id)

  if (index === -1) {
    return NextResponse.json({ message: "Draw not found" }, { status: 404 })
  }

  drawsStore.splice(index, 1)
  return NextResponse.json({ data: { id } })
}
