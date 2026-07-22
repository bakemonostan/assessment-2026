import type { Control, FieldValues, Path } from "react-hook-form";

/**
 * Option shape for select/radio fields.
 * Accepts both plain strings and { label, value } objects.
 */
export type FieldOption = string | { label: string; value: string };

export const getOptionLabel = (option: FieldOption): string =>
  typeof option === "string" ? option : option.label;

export const getOptionValue = (option: FieldOption): string =>
  typeof option === "string" ? option : option.value;

/**
 * Base props shared across all form field components
 */
export interface BaseFieldProps<T extends FieldValues> {
  /** Field name from form schema */
  name: Path<T>;
  /** React Hook Form control object */
  control: Control<T>;
  /** Field label text */
  label: string;
  /** Optional field description */
  description?: string;
}

/**
 * Props for input and textarea fields
 */
export interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  /** HTML for attribute */
  htmlFor?: string;
  /** Input element ID */
  inputId?: string;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for select field
 */
export interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  /** Array of select options — plain strings or { label, value } objects */
  items: FieldOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Props for checkbox field
 */
export interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  /** Checkbox text label (falls back to label if omitted) */
  text?: string;
}

/**
 * Props for radio group field
 */
export interface RadioGroupFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  /** Array of radio options — plain strings or { label, value } objects */
  items: FieldOption[];
}

/**
 * Props for slider field
 */
export interface SliderFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Props for number input field
 */
export interface NumberFieldProps<T extends FieldValues> extends TextFieldProps<T> {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Props for date picker field
 */
export interface DatePickerFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
}

/**
 * Props for PIN/OTP input field
 */
export interface PinInputFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  maxLength?: number;
}

/**
 * Props for date range picker field
 */
export interface DateRangePickerFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  placeholder?: string;
  numberOfMonths?: number;
}

/**
 * Props for file upload field
 */
export interface FileUploadFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  accept?: Record<string, string[]>;
  maxFiles?: number;
  multiple?: boolean;
  /**
   * Called when files are dropped/selected. Use this to run your real
   * upload logic and report progress back via onProgress.
   */
  onUpload?: (files: File[], onProgress: (fileId: string, pct: number) => void) => Promise<void>;
}
