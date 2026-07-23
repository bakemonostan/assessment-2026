import { z } from "zod"

import { USER_ROLES } from "@/features/auth/types/role"

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
  userRole: z.enum(USER_ROLES),
})

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email"),
})

export type LoginValues = z.infer<typeof loginSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
