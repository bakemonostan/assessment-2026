import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckboxFieldProps } from "./types";

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
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal">
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          <div className="flex flex-col gap-1">
            <FieldLabel>{text ?? label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        </Field>
      )}
    />
  );
}
