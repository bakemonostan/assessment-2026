import { WinnerDetailsPage } from "@/features/winners"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <WinnerDetailsPage winnerId={id} />
}
