"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import { AlertModal } from "@/components/shared/modals/AlertModal"
import { ModalContainer } from "@/components/shared/modals/ModalContainer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { formatCurrency, STATUS_VARIANT, type DemoDraw } from "./data"

type Props = {
  draw: DemoDraw | null
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
            <dt className="text-muted-foreground">Date</dt>
            <dd>{draw.drawDate}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Tickets</dt>
            <dd>{draw.ticketCount.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Prize pool</dt>
            <dd>{formatCurrency(draw.prizePool)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Status</dt>
            <dd>
              <Badge variant={STATUS_VARIANT[draw.status]}>{draw.status}</Badge>
            </dd>
          </div>
        </dl>
      ) : null}
    </ModalContainer>
  )
}

type EditProps = Props & {
  onSave: (name: string) => void
}

export function EditDrawModal({
  draw,
  open,
  onOpenChange,
  onSave,
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
          <Label htmlFor="draw-name">Name</Label>
          <Input
            id="draw-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(name.trim() || draw?.name || "")
              toast.success("Draw updated")
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

type DeleteProps = Props & {
  onConfirm: () => void
}

export function DeleteDrawModal({
  draw,
  open,
  onOpenChange,
  onConfirm,
}: DeleteProps) {
  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete draw?"
      description={
        draw
          ? `“${draw.name}” will be removed from this demo list.`
          : "This draw will be removed."
      }
      variant="destructive"
      confirmText="Delete"
      onConfirm={() => {
        onConfirm()
        toast.success("Draw deleted")
      }}
    />
  )
}
