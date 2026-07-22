import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { TextFieldProps } from "./types";

interface FieldTextareaProps<T extends FieldValues> extends TextFieldProps<T> {
  rows?: number;
}

/**
 * Form field component for multi-line text inputs.
 *
 * @example
 * <FieldTextarea control={form.control} name="bio" label="Bio" rows={4} />
 */
export function FieldTextarea<T extends FieldValues>({
  name,
  control,
  label = "Label",
  htmlFor,
  inputId,
  rows = 4,
  placeholder = "Placeholder text",
  description,
}: FieldTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={htmlFor ?? inputId}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={inputId}
            placeholder={placeholder}
            rows={rows}
            className="resize-none min-h-28"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
