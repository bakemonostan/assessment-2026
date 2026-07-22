export const queryKeys = {
  draws: {
    all: ["draws"] as const,
    list: (status = "all") => ["draws", "list", status] as const,
    detail: (id: string) => ["draws", "detail", id] as const,
  },
}
