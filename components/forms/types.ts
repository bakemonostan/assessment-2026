import { useId } from "react"
import type { Control, FieldValues, Path } from "react-hook-form"

/**
 * Option shape for select/radio fields.
 * Accepts both plain strings and { label, value } objects.
 */
export type FieldOption = string | { label: string; value: string }

export const getOptionLabel = (option: FieldOption): string =>
  typeof option === "string" ? option : option.label

export const getOptionValue = (option: FieldOption): string =>
  typeof option === "string" ? option : option.value

/**
 * Stable field id: explicit `id` wins, otherwise `useId()` + field name.
 */
export function useFieldId(name: string, id?: string) {
  const reactId = useId()
  return id ?? `${reactId}-${name}`
}

/**
 * Base props shared across all form field components
 */
export interface BaseFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  description?: string
  /** Override the generated input id */
  id?: string
  disabled?: boolean
  className?: string
}

/**
 * Props for input and textarea fields
 */
export interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string
  autoComplete?: string
}

/**
 * Props for select field
 */
export interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  items: FieldOption[]
  placeholder?: string
}

/**
 * Props for checkbox field
 */
export interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  /** Checkbox text label (falls back to label if omitted) */
  text?: string
  labelClassName?: string
}

/**
 * Props for radio group field
 */
export interface RadioGroupFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  items: FieldOption[]
}

/**
 * Props for number input field
 */
export interface NumberFieldProps<T extends FieldValues> extends TextFieldProps<T> {
  min?: number
  max?: number
  step?: number
}

/**
 * Props for date picker field
 */
export interface DatePickerFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string
}

/**
 * Props for date range picker field
 */
export interface DateRangePickerFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string
  numberOfMonths?: number
}
