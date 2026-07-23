import { http, HttpResponse } from "msw"

import { participantsStore } from "@/mocks/data/participants-store"

function isParticipantsList({ request }: { request: Request }) {
  return new URL(request.url).pathname === "/api/participants"
}

export const participantsHandlers = [
  http.get(isParticipantsList, ({ request }) => {
    const url = new URL(request.url)

    if (url.searchParams.get("fail") === "1") {
      return HttpResponse.json(
        { message: "Failed to load participants" },
        { status: 500 }
      )
    }

    const status = url.searchParams.get("status")
    const data =
      !status || status === "all"
        ? participantsStore
        : participantsStore.filter(
            (participant) => participant.status === status
          )

    return HttpResponse.json({ data })
  }),
]
