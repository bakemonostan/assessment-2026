import { Controller, type FieldValues } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import { useFieldId, type CheckboxFieldProps } from "./types"

/**
 * Form field component for a single checkbox.
 *
 * @example
 * <FieldCheckbox
 *   control={form.control}
 *   name="agree"
 *   label="Terms"
 *   text="I agree to the terms and conditions"
 * />
 */
export function FieldCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  text,
  id,
  disabled,
  className,
  labelClassName,
}: CheckboxFieldProps<T>) {
  const fieldId = useFieldId(String(name), id)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          data-disabled={disabled ? true : undefined}
        >
          <Checkbox
            id={fieldId}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            disabled={disabled}
            aria-invalid={fieldState.invalid || undefined}
            className={cn(className)}
          />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor={fieldId} className={labelClassName}>
              {text ?? label}
            </FieldLabel>
            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </div>
        </Field>
      )}
    />
  )
}
