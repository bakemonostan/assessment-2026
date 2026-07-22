import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import type { BaseFieldProps } from "./types";

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
}: BaseFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal">
          <Switch checked={field.value} onCheckedChange={field.onChange} />
          <div className="flex flex-col gap-1">
            <FieldLabel>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        </Field>
      )}
    />
  );
}
