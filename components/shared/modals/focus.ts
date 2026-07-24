const FIELD_SELECTOR =
  "input:not([disabled]):not([type='hidden']), textarea:not([disabled]), select:not([disabled])"

/**
 * Focus the first editable field in a dialog, or return `true` for Base UI’s default.
 *
 * @example
 * ```tsx
 * initialFocus={() => focusFirstField(contentRef.current)}
 * ```
 */
export function focusFirstField(root: HTMLElement | null): HTMLElement | true {
  if (!root) return true
  return root.querySelector<HTMLElement>(FIELD_SELECTOR) ?? true
}
