"use client"

import { isValidElement } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { ModalContainerProps } from "./types"

export type { ModalContainerProps, SharedModalProps } from "./types"

/**
 * General-purpose dialog shell built on shadcn Dialog (Base UI).
 *
 * Use for forms, detail views, and multi-step content.
 * For confirm/cancel flows, prefer {@link AlertModal}.
 *
 * Width and layout: pass Tailwind classes via `className`
 * (e.g. `sm:max-w-lg`). No built-in size prop.
 *
 * @example
 * Controlled open (no trigger):
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <>
 *   <Button onClick={() => setOpen(true)}>Edit draw</Button>
 *   <ModalContainer
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="Edit draw"
 *     description="Update the draw name and prize pool."
 *     className="sm:max-w-lg"
 *   >
 *     <DrawForm onSuccess={() => setOpen(false)} />
 *   </ModalContainer>
 * </>
 * ```
 *
 * @example
 * With a trigger and no header:
 * ```tsx
 * <ModalContainer
 *   open={open}
 *   onOpenChange={setOpen}
 *   trigger={<Button>Open</Button>}
 *   showCloseButton
 *   className="sm:max-w-md"
 * >
 *   <CustomHeader />
 *   <Body />
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
  const showHeader = title != null || description != null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {isValidElement(trigger) ? <DialogTrigger render={trigger} /> : null}
      <DialogContent showCloseButton={showCloseButton} className={className}>
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
