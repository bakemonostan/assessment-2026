import { drawsHandlers } from "./draws"
import { participantsHandlers } from "./participants"
import { winnersHandlers } from "./winners"

export const handlers = [
  ...drawsHandlers,
  ...participantsHandlers,
  ...winnersHandlers,
]
