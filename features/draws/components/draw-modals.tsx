"use client"

import { useEffect, useState } from "react"

import { AlertModal } from "@/components/shared/modals/AlertModal"
import { ModalContainer } from "@/components/shared/modals/ModalContainer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { STATUS_VARIANT, type Draw } from "@/features/draws/types/draw"
import { formatCurrency } from "@/features/draws/utils/format"

type Props = {
  draw: Draw | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewDrawModal({ draw, open, onOpenChange }: Props) {
  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={draw?.name ?? "Draw details"}
      description="Read-only preview of the selected draw."
      className="sm:max-w-md"
    >
      {draw ? (
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Draw date</dt>
            <dd>{draw.drawDate}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Ticket count</dt>
            <dd>{draw.ticketCount.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Prize pool</dt>
            <dd>{formatCurrency(draw.prizePool)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Status</dt>
            <dd>
              <Badge
                variant={STATUS_VARIANT[draw.status]}
                className="capitalize"
              >
                {draw.status}
              </Badge>
            </dd>
          </div>
        </dl>
      ) : null}
    </ModalContainer>
  )
}

type EditProps = Props & {
  onSave: (name: string) => void
  isPending?: boolean
}

export function EditDrawModal({
  draw,
  open,
  onOpenChange,
  onSave,
  isPending = false,
}: EditProps) {
  const [name, setName] = useState(draw?.name ?? "")

  useEffect(() => {
    if (open && draw) setName(draw.name)
  }, [open, draw])

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Edit draw"
      description="Update the draw name, then save."
      className="sm:max-w-md"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="draw-name">Draw name</Label>
          <Input
            id="draw-name"
            value={name}
            disabled={isPending}
            autoComplete="off"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            disabled={isPending || !name.trim()}
            onClick={() => onSave(name.trim())}
          >
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            Save
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

type CancelProps = Props & {
  onConfirm: () => void
  isPending?: boolean
}

export function CancelDrawModal({
  draw,
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
}: CancelProps) {
  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel this draw?"
      description={
        draw
          ? `“${draw.name}” will be marked as cancelled. Tickets already sold stay on record.`
          : "This draw will be marked as cancelled."
      }
      variant="destructive"
      confirmText="Cancel draw"
      cancelText="Keep draw"
      isPending={isPending}
      onConfirm={onConfirm}
    />
  )
}
