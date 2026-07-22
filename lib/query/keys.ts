type QueryId = string | number
type QueryFilters = Readonly<Record<string, unknown>>

/**
 * Hierarchical TanStack Query keys for one resource.
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

export const queryKeys: Record<
  string,
  ReturnType<typeof createQueryKeyFactory>
> = {
  draws: createQueryKeyFactory("draws"),
} as const
