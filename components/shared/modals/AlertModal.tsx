"use client"

import { isValidElement, useRef } from "react"

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
import { focusFirstField } from "./focus"

export type { AlertModalProps, SharedModalProps } from "./types"

/**
 * Confirm dialog for destructive / irreversible actions.
 *
 * @example Controlled with `useState` (e.g. open from a row action menu)
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * return (
 *   <>
 *     <Button variant="destructive" onClick={() => setOpen(true)}>
 *       Cancel
 *     </Button>
 *     <AlertModal
 *       open={open}
 *       onOpenChange={setOpen}
 *       title="Cancel draw?"
 *       description="This cannot be undone."
 *       confirmText="Cancel draw"
 *       variant="destructive"
 *       isPending={isPending}
 *       onConfirm={() => cancelMutation.mutate(id)}
 *     />
 *   </>
 * )
 * ```
 *
 * @example With `trigger` (dialog opens when the trigger is clicked)
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * return (
 *   <AlertModal
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="Cancel draw?"
 *     description="This cannot be undone."
 *     confirmText="Cancel draw"
 *     variant="destructive"
 *     isPending={isPending}
 *     trigger={<Button variant="destructive">Cancel</Button>}
 *     onConfirm={() => cancelMutation.mutate(id)}
 *   />
 * )
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
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {isValidElement(trigger) ? (
        <AlertDialogTrigger render={trigger} />
      ) : null}
      <AlertDialogContent
        ref={contentRef}
        className={className}
        initialFocus={() => focusFirstField(contentRef.current)}
        finalFocus
      >
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
