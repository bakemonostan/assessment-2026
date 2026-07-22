import type { ReactElement, ReactNode } from "react"

/**
 * Props shared by {@link AlertModal} and {@link ModalContainer}.
 */
export interface SharedModalProps {
  /** Whether the dialog is visible. */
  open: boolean
  /**
   * Called when open state changes (overlay click, Escape, cancel, etc.).
   * Use this as the single source of truth for controlled open state.
   */
  onOpenChange: (open: boolean) => void
  /** Dialog heading. Required for AlertModal; optional for ModalContainer. */
  title?: ReactNode
  /** Supporting text below the title. */
  description?: ReactNode
  /**
   * Optional element that opens the dialog when clicked.
   * Must be a single React element (e.g. `<Button>Open</Button>`).
   * Omit if you open the dialog only via `open` / `onOpenChange`.
   */
  trigger?: ReactElement
  /** Extra content in the dialog body. */
  children?: ReactNode
  /** Classes merged onto the dialog content surface (e.g. `sm:max-w-lg`). */
  className?: string
}

/**
 * Props for {@link AlertModal} — confirmation dialogs with cancel / confirm actions.
 */
export interface AlertModalProps extends SharedModalProps {
  title: ReactNode
  /** Runs when the user clicks the primary (confirm) button. */
  onConfirm: () => void
  /** Label for the dismiss button. @default `"Cancel"` */
  cancelText?: string
  /** Label for the confirm button. @default `"Continue"` */
  confirmText?: string
  /**
   * Visual style for the confirm button.
   * @default `"default"`
   */
  variant?: "default" | "destructive"
  /** Disables actions and shows a spinner on confirm. @default `false` */
  isPending?: boolean
}

/**
 * Props for {@link ModalContainer} — general-purpose dialog shell.
 */
export interface ModalContainerProps extends SharedModalProps {
  children: ReactNode
  /** Show the top-right close button. @default `true` */
  showCloseButton?: boolean
}
