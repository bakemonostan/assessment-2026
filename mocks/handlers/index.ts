import { drawsHandlers } from "./draws"
import { participantsHandlers } from "./participants"

export const handlers = [...drawsHandlers, ...participantsHandlers]
