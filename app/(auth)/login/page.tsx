import { LoginForm } from "@/features/auth"
import { GuestOnly } from "@/features/auth/components/guest-only"
import { BrandLogo } from "@/components/shared/layout/BrandLogo"

export default function LoginPage() {
  return (
    <GuestOnly>
      <div className="flex flex-col gap-6 rounded-sm border p-6 shadow-md">
        <div className="flex flex-col gap-3 text-start">
          <BrandLogo href={undefined} height={36} priority />
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        </div>
        <LoginForm />
      </div>
    </GuestOnly>
  )
}
