type QueryId = string | number
type QueryFilters = Readonly<Record<string, unknown>>

/**
 * Hierarchical TanStack Query keys for one resource.
 *
 * @example
 * ```ts
 * queryKeys.draws.list({ status: "active" })
 * queryKeys.winners.detail("w1")
 * ```
 */
export function createQueryKeyFactory<const Scope extends string>(
  scope: Scope
) {
  const all = [scope] as const

  return {
    all,
    lists: () => [...all, "list"] as const,
    list: <const Filters extends QueryFilters>(filters: Filters) =>
      [...all, "list", filters] as const,
    details: () => [...all, "detail"] as const,
    detail: <const Id extends QueryId>(id: Id) =>
      [...all, "detail", id] as const,
  }
}

/** App-wide query key factories. */
export const queryKeys: Record<
  string,
  ReturnType<typeof createQueryKeyFactory>
> = {
  draws: createQueryKeyFactory("draws"),
  dashboard: createQueryKeyFactory("dashboard"),
  participants: createQueryKeyFactory("participants"),
  winners: createQueryKeyFactory("winners"),
} as const
