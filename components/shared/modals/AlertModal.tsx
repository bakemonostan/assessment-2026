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
 * Confirmation dialog built on shadcn AlertDialog (Base UI).
 *
 * Focus: first field in the body if present, otherwise Cancel/Confirm.
 * On close, focus returns to the trigger / previously focused element.
 *
 * Use for destructive or irreversible actions (delete, cancel draw, etc.).
 * Controlled via `open` / `onOpenChange`.
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
