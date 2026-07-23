import { Controller, type FieldValues } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

import {
  getOptionLabel,
  getOptionValue,
  useFieldId,
  type SelectFieldProps,
} from "./types"

/**
 * Form field component for select dropdowns.
 * Accepts plain strings or { label, value } objects as items.
 *
 * @example
 * <FieldSelect
 *   control={form.control}
 *   name="role"
 *   label="Role"
 *   items={[{ label: "Admin", value: "admin" }, { label: "User", value: "user" }]}
 * />
 */
export function FieldSelect<T extends FieldValues>({
  name,
  items,
  control,
  label = "Label",
  placeholder = "Choose option",
  description,
  id,
  disabled = false,
  className,
}: SelectFieldProps<T>) {
  const fieldId = useFieldId(String(name), id)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-disabled={disabled ? true : undefined}>
          <FieldLabel id={`${fieldId}-label`} htmlFor={fieldId}>
            {label}
          </FieldLabel>
          <Select
            name={String(name)}
            id={fieldId}
            autoComplete="off"
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              aria-labelledby={`${fieldId}-label`}
              aria-invalid={fieldState.invalid || undefined}
              className={cn(className)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={getOptionValue(item)} value={getOptionValue(item)}>
                  {getOptionLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
        </Field>
      )}
    />
  )
}
