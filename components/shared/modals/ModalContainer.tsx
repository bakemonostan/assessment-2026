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
 * General dialog shell for forms and detail views.
 *
 * @example
 * ```tsx
 * <ModalContainer
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Edit draw"
 *   className="sm:max-w-md"
 *   trigger={<Button>Edit</Button>}
 * >
 *   <EditForm />
 * </ModalContainer>
 * ```
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
