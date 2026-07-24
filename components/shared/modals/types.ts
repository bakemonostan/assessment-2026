import type { ReactElement, ReactNode } from "react"

/** Shared controlled-dialog props for AlertModal and ModalContainer. */
export interface SharedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  /** Optional clickable opener, e.g. `<Button>Open</Button>`. */
  trigger?: ReactElement
  children?: ReactNode
  /** Extra classes on the dialog surface, e.g. `sm:max-w-lg`. */
  className?: string
}

/** Confirm dialog props (cancel + confirm actions). */
export interface AlertModalProps extends SharedModalProps {
  title: ReactNode
  onConfirm: () => void
  /** @default `"Cancel"` */
  cancelText?: string
  /** @default `"Continue"` */
  confirmText?: string
  /** @default `"default"` */
  variant?: "default" | "destructive"
  /** Disables actions and shows a spinner on confirm. @default `false` */
  isPending?: boolean
}

/** General dialog shell props. */
export interface ModalContainerProps extends SharedModalProps {
  children: ReactNode
  /** @default `true` */
  showCloseButton?: boolean
}
