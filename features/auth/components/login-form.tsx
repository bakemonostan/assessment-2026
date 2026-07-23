"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { FieldCheckbox, FieldInput, FieldSelect } from "@/components/forms"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { loginSchema, type LoginValues } from "@/features/auth/types/login"
import { setAuthSession } from "@/features/auth/utils/session"

export function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
      userRole: "admin",
    },
  })

  const { control, handleSubmit, formState } = form
  const { isSubmitting } = formState

  async function onSubmit(values: LoginValues) {
    await new Promise((resolve) => setTimeout(resolve, 600))

    setAuthSession({
      email: values.email,
      role: values.userRole,
    })

    toast.success(`Signed in as ${values.email} (${values.userRole})`)
    router.push("/")
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
      <FieldInput
        control={control}
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
      />
      <FieldSelect
        control={control}
        name="userRole"
        label="User role"
        items={[
          { label: "Admin", value: "admin" },
          { label: "Support", value: "support" },
        ]}
      />
      <div className="grid grid-cols-2 gap-2">
        <FieldCheckbox
          className="text-xs"
          labelClassName="text-xs"
          control={control}
          name="remember"
          label="Remember me"
          text="Remember me"
        />
        <Link
          href="/forgot-password"
          className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Sign in
      </Button>
    </form>
  )
}
