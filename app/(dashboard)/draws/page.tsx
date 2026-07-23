import { RequireAdmin } from "@/features/auth/components/require-admin"
import { DrawsPage } from "@/features/draws"

export default function Page() {
  return (
    <RequireAdmin>
      <DrawsPage />
    </RequireAdmin>
  )
}
