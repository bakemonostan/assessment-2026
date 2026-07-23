import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"
import { GuestOnly } from "@/features/auth/components/guest-only"
import { BrandLogo } from "@/components/shared/layout/BrandLogo"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <GuestOnly>
      <div className="flex flex-col gap-6 rounded-sm border p-6 shadow-md">
        <Link
          href="/login"
          className="mb-2 flex w-max items-center gap-1 rounded-full border border-border p-1 text-xs transition-all duration-300 hover:scale-105 hover:border-primary"
          aria-label="Back to sign in"
        >
          <ArrowLeftIcon className="size-4 text-primary" />
        </Link>
        <div className="flex flex-col gap-3 text-start">
          <BrandLogo href={undefined} height={36} />
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot password
          </h1>
        </div>
        <ForgotPasswordForm />
      </div>
    </GuestOnly>
  )
}
