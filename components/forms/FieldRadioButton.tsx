import { Controller, type FieldValues } from "react-hook-form"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

import {
  getOptionLabel,
  getOptionValue,
  useFieldId,
  type RadioGroupFieldProps,
} from "./types"

/**
 * Form field component for radio button groups.
 * FieldSet/FieldLegend are correct here — this is a genuine group of related inputs.
 * Accepts plain strings or { label, value } objects as items.
 *
 * @example
 * <FieldRadioButton
 *   control={form.control}
 *   name="size"
 *   label="Size"
 *   items={[{ label: "Small", value: "sm" }, { label: "Large", value: "lg" }]}
 * />
 */
export function FieldRadioButton<T extends FieldValues>({
  control,
  name,
  label,
  description,
  items,
  id,
  disabled,
  className,
}: RadioGroupFieldProps<T>) {
  const fieldId = useFieldId(String(name), id)

  return (
    <FieldSet data-disabled={disabled ? true : undefined} className={cn(className)}>
      <FieldLegend>{label}</FieldLegend>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value ?? ""}
                onValueChange={field.onChange}
                disabled={disabled}
                aria-invalid={fieldState.invalid || undefined}
              >
                {items.map((item) => {
                  const value = getOptionValue(item)
                  const itemLabel = getOptionLabel(item)
                  const optionId = `${fieldId}-${value}`
                  return (
                    <Field key={value} orientation="horizontal">
                      <RadioGroupItem value={value} id={optionId} disabled={disabled} />
                      <FieldLabel htmlFor={optionId}>{itemLabel}</FieldLabel>
                    </Field>
                  )
                })}
              </RadioGroup>
              {description ? <FieldDescription>{description}</FieldDescription> : null}
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </>
          )}
        />
      </FieldGroup>
    </FieldSet>
  )
}
