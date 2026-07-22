"use client"

import { isValidElement } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"

import type { AlertModalProps } from "./types"

export type { AlertModalProps, SharedModalProps } from "./types"

/**
 * Confirmation dialog built on shadcn AlertDialog (Base UI).
 *
 * Use for destructive or irreversible actions (delete, cancel draw, etc.).
 * Controlled via `open` / `onOpenChange`.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <AlertModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Delete draw?"
 *   description="This cannot be undone."
 *   variant="destructive"
 *   cancelText="Keep"
 *   confirmText="Delete"
 *   isPending={isPending}
 *   onConfirm={() => {
 *     deleteDraw()
 *     setOpen(false)
 *   }}
 * />
 * ```
 *
 * @example
 * With a trigger button:
 * ```tsx
 * <AlertModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   trigger={<Button variant="outline">Cancel draw</Button>}
 *   title="Cancel this draw?"
 *   description="Tickets already sold will remain valid until you confirm."
 *   variant="destructive"
 *   confirmText="Cancel draw"
 *   onConfirm={handleCancel}
 * />
 * ```
 */
export function AlertModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Continue",
  variant = "default",
  isPending = false,
  trigger,
  children,
  className,
}: AlertModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {isValidElement(trigger) ? (
        <AlertDialogTrigger render={trigger} />
      ) : null}
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            variant={variant === "destructive" ? "destructive" : "default"}
            disabled={isPending}
            onClick={() => {
              if (isPending) return
              onConfirm()
            }}
          >
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
