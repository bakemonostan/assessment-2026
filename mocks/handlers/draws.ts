import { http, HttpResponse } from "msw"

import { drawsStore } from "@/mocks/data/draws-store"

type UpdateDrawBody = {
  name?: string
  status?: "upcoming" | "active" | "completed" | "cancelled"
}

function isDrawsList({ request }: { request: Request }) {
  return new URL(request.url).pathname === "/api/draws"
}

function isDrawById({ request }: { request: Request }) {
  return /^\/api\/draws\/[^/]+$/.test(new URL(request.url).pathname)
}

function drawIdFromRequest(request: Request) {
  return new URL(request.url).pathname.split("/").pop()!
}

export const drawsHandlers = [
  http.get(isDrawsList, ({ request }) => {
    const url = new URL(request.url)

    if (url.searchParams.get("fail") === "1") {
      return HttpResponse.json(
        { message: "Failed to load draws" },
        { status: 500 }
      )
    }

    const status = url.searchParams.get("status")
    const data =
      !status || status === "all"
        ? drawsStore
        : drawsStore.filter((draw) => draw.status === status)

    return HttpResponse.json({ data })
  }),

  http.get(isDrawById, ({ request }) => {
    const id = drawIdFromRequest(request)
    const draw = drawsStore.find((item) => item.id === id)
    if (!draw) {
      return HttpResponse.json({ message: "Draw not found" }, { status: 404 })
    }
    return HttpResponse.json({ data: draw })
  }),

  http.patch(isDrawById, async ({ request }) => {
    const id = drawIdFromRequest(request)
    const index = drawsStore.findIndex((item) => item.id === id)
    if (index === -1) {
      return HttpResponse.json({ message: "Draw not found" }, { status: 404 })
    }

    const body = (await request.json()) as UpdateDrawBody
    const current = drawsStore[index]

    if (body.status === "cancelled") {
      if (current.status !== "upcoming" && current.status !== "active") {
        return HttpResponse.json(
          { message: "Only upcoming or active draws can be cancelled." },
          { status: 400 }
        )
      }
    }

    const updated = {
      ...current,
      name: body.name?.trim() || current.name,
      status: body.status ?? current.status,
    }
    drawsStore[index] = updated
    return HttpResponse.json({ data: updated })
  }),

  http.delete(isDrawById, ({ request }) => {
    const id = drawIdFromRequest(request)
    const index = drawsStore.findIndex((item) => item.id === id)
    if (index === -1) {
      return HttpResponse.json({ message: "Draw not found" }, { status: 404 })
    }

    drawsStore.splice(index, 1)
    return HttpResponse.json({ data: { id } })
  }),
]
