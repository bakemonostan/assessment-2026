import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getOptionLabel, getOptionValue, type RadioGroupFieldProps } from "./types";

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
}: RadioGroupFieldProps<T>) {
  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                {items.map((item) => {
                  const value = getOptionValue(item);
                  const itemLabel = getOptionLabel(item);
                  return (
                    <Field key={value} orientation="horizontal">
                      <RadioGroupItem value={value} id={value} />
                      <FieldLabel htmlFor={value}>{itemLabel}</FieldLabel>
                    </Field>
                  );
                })}
              </RadioGroup>
              {description && <FieldDescription>{description}</FieldDescription>}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
