"use client"

import { isValidElement, useRef } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { ModalContainerProps } from "./types"
import { focusFirstField } from "./focus"

export type { ModalContainerProps, SharedModalProps } from "./types"

/**
 * General-purpose dialog shell built on shadcn Dialog (Base UI).
 *
 * Focus: first form field on open (falls back to first tabbable).
 * On close, focus returns to the trigger / previously focused element.
 *
 * Use for forms, detail views, and multi-step content.
 * For confirm/cancel flows, prefer {@link AlertModal}.
 *
 * Width and layout: pass Tailwind classes via `className`
 * (e.g. `sm:max-w-lg`). No built-in size prop.
 */
export function ModalContainer({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  showCloseButton = true,
  children,
  className,
}: ModalContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const showHeader = title != null || description != null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {isValidElement(trigger) ? <DialogTrigger render={trigger} /> : null}
      <DialogContent
        ref={contentRef}
        showCloseButton={showCloseButton}
        className={className}
        initialFocus={() => focusFirstField(contentRef.current)}
        finalFocus
      >
        {showHeader ? (
          <DialogHeader>
            {title != null ? <DialogTitle>{title}</DialogTitle> : null}
            {description != null ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  )
}
