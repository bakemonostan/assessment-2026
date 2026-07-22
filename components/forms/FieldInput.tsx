import { Controller, type FieldValues } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useFieldId, type TextFieldProps } from "./types"

interface FieldInputProps<T extends FieldValues> extends TextFieldProps<T> {
  type?: "text" | "email" | "password"
}

/**
 * Form field component for text-based inputs.
 * Use FieldNumber for numeric inputs — it handles valueAsNumber correctly.
 *
 * @example
 * <FieldInput control={form.control} name="email" label="Email" type="email" autoComplete="email" />
 */
export function FieldInput<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  id,
  type = "text",
  placeholder = "Placeholder text",
  autoComplete,
  disabled,
  className,
}: FieldInputProps<T>) {
  const fieldId = useFieldId(String(name), id)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-disabled={disabled ? true : undefined}>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Input
            {...field}
            id={fieldId}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-invalid={fieldState.invalid || undefined}
            className={cn(className)}
          />
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
        </Field>
      )}
    />
  )
}
