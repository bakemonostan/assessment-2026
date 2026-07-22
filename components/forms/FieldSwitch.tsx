import { Controller, type FieldValues } from "react-hook-form"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import { useFieldId, type BaseFieldProps } from "./types"

/**
 * Form field component for toggle switches.
 *
 * @example
 * <FieldSwitch control={form.control} name="notifications" label="Enable notifications" />
 */
export function FieldSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  id,
  disabled,
  className,
}: BaseFieldProps<T>) {
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
          <Switch
            id={fieldId}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
            aria-invalid={fieldState.invalid || undefined}
            className={cn(className)}
          />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
            {description ? <FieldDescription>{description}</FieldDescription> : null}
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </div>
        </Field>
      )}
    />
  )
}
