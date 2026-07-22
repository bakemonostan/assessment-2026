import { Controller, type FieldValues } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useFieldId, type NumberFieldProps } from "./types"

/**
 * Form field component for numeric inputs.
 * Correctly coerces the value to a number via valueAsNumber.
 *
 * @example
 * <FieldNumber control={form.control} name="age" label="Age" min={0} max={120} />
 */
export function FieldNumber<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  id,
  placeholder = "Enter number",
  min,
  max,
  step,
  autoComplete,
  disabled,
  className,
}: NumberFieldProps<T>) {
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
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-invalid={fieldState.invalid || undefined}
            className={cn(className)}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
          />
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
        </Field>
      )}
    />
  )
}
