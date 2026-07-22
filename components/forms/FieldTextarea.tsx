import { Controller, type FieldValues } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { useFieldId, type TextFieldProps } from "./types"

interface FieldTextareaProps<T extends FieldValues> extends TextFieldProps<T> {
  rows?: number
}

/**
 * Form field component for multi-line text inputs.
 *
 * @example
 * <FieldTextarea control={form.control} name="bio" label="Bio" rows={4} />
 */
export function FieldTextarea<T extends FieldValues>({
  name,
  control,
  label = "Label",
  id,
  rows = 4,
  placeholder = "Placeholder text",
  description,
  autoComplete,
  disabled,
  className,
}: FieldTextareaProps<T>) {
  const fieldId = useFieldId(String(name), id)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-disabled={disabled ? true : undefined}>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={fieldId}
            placeholder={placeholder}
            rows={rows}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-invalid={fieldState.invalid || undefined}
            className={cn("min-h-28 resize-none", className)}
          />
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
        </Field>
      )}
    />
  )
}
