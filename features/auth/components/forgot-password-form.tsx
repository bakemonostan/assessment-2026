"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { FieldInput } from "@/components/forms"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/features/auth/types/autth"

export function ForgotPasswordForm() {
  const router = useRouter()
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const { control, handleSubmit, formState } = form
  const { isSubmitting } = formState

  async function onSubmit(values: ForgotPasswordValues) {
    await new Promise((resolve) => setTimeout(resolve, 600))

    toast.success(`Reset password email sent to ${values.email}`)
    router.push("/login")
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FieldInput
        control={control}
        name="email"
        label="Email"
        type="email"
        placeholder="admin@techbox.com"
        autoComplete="email"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Reset password
      </Button>
    </form>
  )
}
