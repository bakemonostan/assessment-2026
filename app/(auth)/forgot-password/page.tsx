import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6 rounded-sm border p-6 shadow-md">
      <Link
        href="/login"
        className="mb-2 flex w-max items-center gap-1 rounded-full border border-border p-1 text-xs transition-all duration-300 hover:scale-105 hover:border-primary"
      >
        <ArrowLeftIcon className="size-4 text-primary" />
      </Link>
      <div className="flex flex-col gap-1.5 text-start">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          TechBox
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot password
        </h1>
      </div>
      <ForgotPasswordForm />
    </div>
  )
}
