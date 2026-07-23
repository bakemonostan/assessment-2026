import { http, HttpResponse } from "msw"

import {
  toWinnerListItem,
  winnersStore,
} from "@/mocks/data/winners-store"

function isWinnersList({ request }: { request: Request }) {
  return new URL(request.url).pathname === "/api/winners"
}

function isWinnerById({ request }: { request: Request }) {
  return /^\/api\/winners\/[^/]+$/.test(new URL(request.url).pathname)
}

export const winnersHandlers = [
  http.get(isWinnersList, ({ request }) => {
    const url = new URL(request.url)

    if (url.searchParams.get("fail") === "1") {
      return HttpResponse.json(
        { message: "Failed to load winners" },
        { status: 500 }
      )
    }

    const paymentStatus = url.searchParams.get("paymentStatus")
    const filtered =
      !paymentStatus || paymentStatus === "all"
        ? winnersStore
        : winnersStore.filter(
            (winner) => winner.paymentStatus === paymentStatus
          )

    return HttpResponse.json({ data: filtered.map(toWinnerListItem) })
  }),

  http.get(isWinnerById, ({ request }) => {
    const id = new URL(request.url).pathname.split("/").pop()!
    const winner = winnersStore.find((item) => item.id === id)
    if (!winner) {
      return HttpResponse.json({ message: "Winner not found" }, { status: 404 })
    }
    return HttpResponse.json({ data: winner })
  }),
]
