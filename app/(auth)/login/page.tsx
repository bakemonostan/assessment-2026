import { LoginForm } from "@/features/auth"

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 rounded-sm border p-6 shadow-md">
      <div className="flex flex-col gap-1.5 text-start">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          TechBox
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      </div>
      <LoginForm />
    </div>
  )
}
