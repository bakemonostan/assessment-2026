import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { NumberFieldProps } from "./types";

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
  htmlFor,
  inputId,
  placeholder = "Enter number",
  min,
  max,
  step,
}: NumberFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={htmlFor ?? inputId}>{label}</FieldLabel>
          <Input
            {...field}
            id={inputId}
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
