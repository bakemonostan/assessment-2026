import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
  userRole: z.enum(["admin", "support"]),
})

export type LoginValues = z.infer<typeof loginSchema>
