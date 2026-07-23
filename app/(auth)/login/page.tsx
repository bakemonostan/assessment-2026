import { LoginForm } from "@/features/auth"

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 text-center">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          TechBox
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Use any email and a password with 6+ characters to test the form.
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
