const FIELD_SELECTOR =
  "input:not([disabled]):not([type='hidden']), textarea:not([disabled]), select:not([disabled])"

/**
 * Prefer the first editable field inside a dialog.
 * Returns `true` so Base UI can fall back to its default (first tabbable).
 */
export function focusFirstField(root: HTMLElement | null): HTMLElement | true {
  if (!root) return true
  return root.querySelector<HTMLElement>(FIELD_SELECTOR) ?? true
}
