import { http, HttpResponse } from "msw"

import { drawsStore } from "@/mocks/data/draws-store"

type UpdateDrawBody = {
  name?: string
}

export const drawsHandlers = [
  http.get("/api/draws", ({ request }) => {
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

  http.get("/api/draws/:id", ({ params }) => {
    const draw = drawsStore.find((item) => item.id === params.id)
    if (!draw) {
      return HttpResponse.json({ message: "Draw not found" }, { status: 404 })
    }
    return HttpResponse.json({ data: draw })
  }),

  http.patch("/api/draws/:id", async ({ params, request }) => {
    const index = drawsStore.findIndex((item) => item.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ message: "Draw not found" }, { status: 404 })
    }

    const body = (await request.json()) as UpdateDrawBody
    const current = drawsStore[index]
    const updated = {
      ...current,
      name: body.name?.trim() || current.name,
    }
    drawsStore[index] = updated
    return HttpResponse.json({ data: updated })
  }),

  http.delete("/api/draws/:id", ({ params }) => {
    const index = drawsStore.findIndex((item) => item.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ message: "Draw not found" }, { status: 404 })
    }

    drawsStore.splice(index, 1)
    return HttpResponse.json({ data: { id: params.id } })
  }),
]
